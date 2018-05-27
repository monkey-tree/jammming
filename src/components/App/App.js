import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import PlaylistSave from '../PlaylistSave/PlaylistSave';
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



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: 'Enter A Song Title',
            searchResults: [],
            playlistName: 'New Playlist',
            playlist: [],
            playlistSaved: false,
            trackInProcess: {}
        }
        this.search = this.search.bind(this);
        this.searchBarOnChange = this.searchBarOnChange.bind(this);
        this.trackActionOnClick = this.trackActionOnClick.bind(this);
        this.playlistSaveOnClick = this.playlistSaveOnClick.bind(this);
        this.playlistNameOnChange = this.playlistNameOnChange.bind(this);

    }

    search() {
        //code for search tracks from Spotify.
        Spotify.getAccessToken();
        Spotify.search(this.state.searchText).then(searchResultsRaw => {
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
            
            this.setState(
                { 'searchResults': tracks }
            );
        })
        //let searchResults = searchTracks;
        //let searchResults = Spotify.search(this.state.searchText);
        
    }

    searchBarOnChange(searchText) {
        this.setState(
            {searchText: searchText}
        );
    }

    playlistNameOnChange(e) {
        const playlistName = e.target.value;
        console.log(playlistName);
        this.setState({
            playlistName: playlistName
        });
    }

    playlistSaveOnClick() {
        console.log("playlistSaveOnClick");
        Spotify.playlistSave(this.state.playlistName, this.state.playlist);
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
                <SearchBar onClick={this.search} searchText={this.state.searchText} onChange={this.searchBarOnChange}/>
                <div className="App-playlist">
                    <div className="SearchResults">
                        <h2>Results</h2>
                        <TrackList tracks={this.state.searchResults} listType="SearchResults"
                            trackAction='+'
                            trackActionOnClick={this.trackActionOnClick} />
                    </div>
                    <div className="Playlist">
                        <input defaultValue={this.state.playlistName} onChange={this.playlistNameOnChange}/>
                        <TrackList tracks={this.state.playlist} listType="Playlist"
                            trackAction='-'
                            trackActionOnClick={this.trackActionOnClick} />
                        <PlaylistSave onClick={this.playlistSaveOnClick}/>
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