import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import Spotify from '../../util/Spotify';
import logo from './logo.svg';
import './App.css';


const clientId = '10e309ca50d3433381b35e25783422cc';
const clientSecret = 'aacc6a2a72f84e2aa2befe4c0d4f9259';
const urlAuthentication = 'https://accounts.spotify.com/authorize/?';
const urlSearch = 'https://api.spotify.com/v1/search?type=track&q=';
const redirectUri = 'http://localhost:3000/';
const scopes = 'user-library-modify playlist-modify-public playlist-modify-private';
//let accessToken = '';
//let expiresIn = 0;



const searchTrack = {
    trackName: "Tiny Dancer",
    singer: "TimMcGraw",
    album: "Love Story",
    uri: "aaa"
};
let searchTracks = [
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
};
let playlist = [
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
            playlistSaved: false,
            trackInProcess: {}
        }
        this.searchByWindowLocation = this.searchByWindowLocation.bind(this);
        this.searchByFetch = this.searchByFetch.bind(this);
        this.searchBarOnChange = this.searchBarOnChange.bind(this);
        this.trackActionOnClick = this.trackActionOnClick.bind(this);
        //this.getAccessToken = this.getAccessToken.bind(this);
        

    }

    searchByWindowLocation() {
        //code for search tracks from Spotify.
        Spotify.getAccessToken();
        let searchResults = Spotify.search(this.state.searchText).then(searchResultsRaw => {
            let tracks = [];
            //let track = {};
            searchResultsRaw.tracks.items.map(item => {
                //track.id = item.id;
                //track.trackName = item.name;
                //track.singer = item.artists[0].name;
                //track.album = item.album.name;
                //console.log(track);
                tracks.push({
                    id: item.id,
                    trackName: item.name,
                    singer: item.artists[0].name,
                    album: item.album.name
                });
            })
            console.log(tracks);
            return tracks;
        })
        //let searchResults = searchTracks;
        //let searchResults = Spotify.search(this.state.searchText);
        console.log("searchResults");
        console.log(searchResults);
        this.setState(
            { 'searchResults': searchResults }
        );
    }

    searchByFetch() {
        Spotify.getAccessTokenByFetch();
        
        
    }

    searchBarOnChange(searchText) {
        this.setState(
            {searchText: searchText}
        );
    }

    trackActionOnClick(listType, track) {
        console.log("track=");
        console.log(track);
        console.log("listType=");
        console.log(listType);
        if (listType === "SearchResults") {
            console.log("searchResults trackActionOnClick");
            this.setState((prevState, props) => {
                let newPlaylist = prevState.playlist;
                console.log("newPlaylist:")
                console.log(newPlaylist);               
                newPlaylist.push(track);
                console.log(newPlaylist);
                return { playlist: newPlaylist };
            });
        } else {
            this.setState((prevState, props) => {
                console.log("playlist trackActionOnClick");
                let newPlaylist = [];
                prevState.playlist.map(playlistItem => {
                    console.log("playlistItem.uri=" + playlistItem.uri);
                    if (playlistItem.uri !== track.uri) {

                        newPlaylist.push(playlistItem);
                    }
                });
                console.log("newPlaylist:");
                console.log(newPlaylist)
                return { playlist: newPlaylist };
            });

        }
        
    }

    render() {
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onClick={this.searchByWindowLocation} searchText={this.state.searchText} onChange={this.searchBarOnChange}/>
                <div className="App-playlist">
                    <div className="SearchResults">
                        <h2>Results</h2>
                        <TrackList tracks={this.state.searchResults} listType="SearchResults"
                            trackAction='+'
                            trackActionOnClick={this.trackActionOnClick} />
                    </div>
                    <div className="Playlist">
                        <input defaultValue='New Playlist' />
                        <TrackList tracks={this.state.playlist} listType="Playlist"
                            trackAction='-'
                            trackActionOnClick={this.trackActionOnClick} />
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