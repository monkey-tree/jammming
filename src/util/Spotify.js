// JavaScript source code
const clientId = '10e309ca50d3433381b35e25783422cc';
const urlAuthentication = 'https://accounts.spotify.com/authorize/?';
const urlBase = 'https://api.spotify.com/v1/';
const urlSearch = 'https://api.spotify.com/v1/search?type=track&q=';
const urlGetUserId = 'https://api.spotify.com/v1/me';
const redirectUri = 'http://localhost:3000/';
const scopes = 'user-library-modify playlist-modify-public playlist-modify-private';
let accessToken = '';
let expiresIn = 0;
let userId;



const Spotify = {

    getAccessToken: function () {
        const urlToAuthorization = urlAuthentication + 'client_id=' + clientId
            + '&response_type=token'
            + '&redirect_uri=' + encodeURIComponent(redirectUri)
            + '&scope=' + encodeURIComponent(scopes)
            + '&state=state=34fFs29kd09';

        let accessTokenInUrl = window.location.href.match(/access_token=([^&]*)/);

        if (accessToken !== '') {
            return accessToken;
        } else if (accessTokenInUrl) {
            accessToken = accessTokenInUrl[0].split('=')[1];
            expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split('=')[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

        } else {
            return window.location.href = urlToAuthorization;
        }
    },


    search: async function (searchText) {
        const urlToFetch = urlSearch + searchText;
        await Spotify.getAccessToken();
       
        if (accessToken !== '') {
            try {
                let response = await fetch(urlToFetch,
                    {
                        headers: { authorization: `Bearer ${accessToken}` }
                    })
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return jsonResponse;
                }

                throw new Error("Request failed!");

            } catch (error) {
                console.log(error.message);
            }
        } else {
            throw new Error("accessToken is not gotten!");
        }

        
    },

    //fetch chain to save playlist, works but not easy to read and structure smells.
    //will try to make it more readible by split them into differnet functions and make a chain. 
    savePlaylist: async function (playlistName, playlist) {
        console.log(playlistName);
        if (!playlistName || !playlist.length) {
            return;
        }
        Spotify.getAccessToken();
        let headers = {
            authorization: `Bearer ${accessToken}`
        };
        const trackUris = playlist.map(track => track.uri);
        let userId;
        try {
            fetch(urlGetUserId, { headers: headers }).then(response => {
                return response.json();
            })
                .then(jsonResponse => {
                    userId = jsonResponse.id;
                    const urlCreatePlaylist = urlBase + 'users/' + userId + '/playlists';
                    return fetch(urlCreatePlaylist, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: playlistName })
                    })
                }).then(response => {

                  return response.json();
                }).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    const urlSavePlaylist = urlBase + 'users/' + userId + '/playlists/' + playlistId + '/tracks';
                    return fetch(urlSavePlaylist, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackUris })
                    });
                });
        

        } catch (error) {
            console.log(error.message);
        }
        
    },

    // following code are for trying to have more try/catch in each REST calls.
    // through fetch.then.then could work it seems try catch is missed
    // so try to add try catch to each REST call by creating getUserId function, createPlayList, saveList function firstly
    // and then try to use this.getUserId.then(this.createPlaylist).then(this.saveList) pattern

    getUserId: async function (headers) {
        
        try {
            let response = await fetch(urlGetUserId,
                {
                    headers: headers
                })
            if (response.ok) {
                const jsonResponse = await response.json();
                userId = jsonResponse.id;         
                return jsonResponse.id;
            }

            throw new Error("Request failed!");

        } catch (error) {
            console.log(error.message);
        }
    },

    createPlaylist: async function (userId, playlistName, headers) {
        const urlCreatePlaylist = urlBase + 'users/' + userId + '/playlists';

        try {
            let response = await fetch(urlCreatePlaylist, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            })
            if (response.ok) {
                let jsonResponse = await response.json();
                return jsonResponse.id;
            }

            throw new Error("Request failed!");
        } catch (error) {
            console.log(error.message);
        }
    },

    saveList: async function (userId, playlistId, playlist, headers) {
        const urlSavePlaylist = urlBase + 'users/' + userId + '/playlists/' + playlistId + '/tracks';
        const trackUris = playlist.map(track => track.uri);
        
        try {
            let response = await fetch(urlSavePlaylist, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris })
            })
            if (response.ok) {
                //let jsonResponse = await response.json();
                return;
            }

            throw new Error("Request failed!");

        } catch (error) {
            console.log(error.message);
        }
    },

    
    playlistSave: async function (playlistName, playlist) {
        console.log(playlistName);
        await Spotify.getAccessToken();
        let headers = {
            authorization: `Bearer ${accessToken}`
        };
       
        return Spotify.getUserId(headers).then(userId => {
            return Spotify.createPlaylist(userId, playlistName, headers);
        }).then(playlistId => {
            return Spotify.saveList(userId, playlistId, playlist, headers);
        });

    },

    

}

export default Spotify;