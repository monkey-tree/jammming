// JavaScript source code
const clientId = '10e309ca50d3433381b35e25783422cc';
const clientSecret = 'aacc6a2a72f84e2aa2befe4c0d4f9259';
const urlAuthentication = 'https://accounts.spotify.com/authorize/?';
const urlBase = 'https://api.spotify.com/v1/';
const urlSearch = 'https://api.spotify.com/v1/search?type=track&q=';
const urlGetUserId = 'https://api.spotify.com/v1/me';
const redirectUri = 'http://localhost:3000/';
const scopes = 'user-library-modify playlist-modify-public playlist-modify-private';
let accessToken = '';
let expiresIn = 0;



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
            window.location.href = urlToAuthorization;
        }
    },


    search: async function (searchText) {
        const urlToFetch = urlSearch + searchText;

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
    },

    savePlaylist: async function (playlistName, playlist) {
        console.log(playlistName);
        if (!playlistName || !playlist.length) {
            return;
        }
        Spotify.getAccessToken;
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
                console.log(jsonResponse);
                return jsonResponse;
            }

            throw new Error("Request failed!");

        } catch (error) {
            console.log(error.message);
        }
    },

    createPlayList: async function (playlistName) {

    },

    saveList: async function (playlistId) {

    },

    
    playlistSave: async function (playlistName, playlist) {
        console.log(playlistName);
        Spotify.getAccessToken;
        let headers = {
            authorization: `Bearer ${accessToken}`
        };
        return Spotify.getUserId.then(userId => {
            //createPlayList(userId, playlistName);
            console.log('userId=' + userId);
        });

    },

    

}

export default Spotify;