import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import logo from './logo.svg';
import './App.css';


const clientId = '10e309ca50d3433381b35e25783422cc';
const clientSecret = 'aacc6a2a72f84e2aa2befe4c0d4f9259';
const urlAuthentication = 'https://accounts.spotify.com/authorize/?';
const urlSearch = 'https://api.spotify.com/v1/search?type=track&q=';
const redirectUri = 'http://localhost:3000/';



const searchTrack = {
    trackName: "Tiny Dancer",
    singer: "TimMcGraw",
    album: "Love Story",
    trackAction: "+"
};
const searchTracks = [
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
    searchTrack,
];

const playTrack = {
    trackName: "Stronger",
    singer: "Britney Spears",
    album: "Oops!...I did It Again",
    trackAction: "-"
};
const playlist = [
    playTrack,
    playTrack,
    playTrack,
    playTrack,
    playTrack
];


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: 'Enter A Song Title',
            searchResults: [],
            playlistName: '',
            playlist: [],
            playlistSaved: false
        }
        this.searchTrack = this.searchTrack.bind(this);
        this.search = this.search.bind(this);
        this.searchBarOnChange = this.searchBarOnChange.bind(this);
        this.authentication = this.authentication.bind(this);

    }

    
    authentication = async function () {
        const scopes = 'user-library-modify playlist-modify-public playlist-modify-private';
        const urlToFetch = urlAuthentication + 'client_id=' + clientId
            + '&response_type=code'
            + '&redirect_uri=' + encodeURIComponent(redirectUri)
            + '&scope=' + encodeURIComponent(scopes)
            + '&state=state=34fFs29kd09';
        
        console.log('urlToFetch=' + urlToFetch);
        
        try {
            
            let response = await fetch(urlToFetch);
            console.log(response.ok);
            if (response.ok) {
                //let jsonResponse = await response.json();
                //console.log("jsonResponse:")
                //console.log(jsonResponse);
                console.log(response);
                return response;
            }

            throw new Error('Request failed!');

        } catch (error) {
            console.log(error.message);
        }       
    }
 

    search() {
        const scopes = 'user-library-modify playlist-modify-public playlist-modify-private';
        const urlToFetch = urlAuthentication + 'client_id=' + clientId
            + '&response_type=code'
            + '&redirect_uri=' + encodeURIComponent(redirectUri)
            + '&scope=' + encodeURIComponent(scopes)
            + '&state=state=34fFs29kd09';

        console.log('urlToFetch=' + urlToFetch);
        console.log(window.location.href);
        //window.location.href = 'https://accounts.spotify.com/en/authorize?client_id=10e309ca50d3433381b35e25783422cc&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000%2F&scope=user-library-modify%20playlist-modify-public%20playlist-modify-private&state=state%3D34fFs29kd09';
        //window.location = urlToFetch;
        if (window.location.href === redirectUri) {
            window.location = urlToFetch;
        } else {
            console.log(window.location);
        }
    }

    searchBarOnChange(searchText) {
        this.setState(
            {searchText: searchText}
        );
    }

    searchTrack() {
        //code for search tracks from Spotify.
        this.authentication();
        let searchResults = searchTracks;
        this.setState(
            {'searchResults': searchResults}
        );
    }

    render() {
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onClick={this.searchTrack} searchText={this.state.searchText} onChange={this.searchBarOnChange}/>
                <div className="App-playlist">
                    <div className="SearchResults">
                        <h2>Results</h2>
                        <TrackList tracks={this.state.searchResults} listType="SearchResults"/>
                    </div>
                    <div className="Playlist">
                        <input defaultValue='New Playlist' />
                        <TrackList tracks={this.state.playlist} listType="Playlist"/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;



/*
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
        </p>
            </div>
        );
    }
}
*/