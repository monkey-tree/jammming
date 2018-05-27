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
let headers = {
    authorization: `Bearer ${accessToken}`
};


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
                    headers: {authorization: `Bearer ${accessToken}`}
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

    getUserId: async function () {

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



    playlistSave: async function (playlistName, playlist) {
        console.log(playlistName);
        return this.getUserId.then(userId => {
            //createPlayList(userId, playlistName);
            console.log('userId=' + userId);
        });

    }

}

export default Spotify;