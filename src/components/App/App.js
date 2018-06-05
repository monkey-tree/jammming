import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Modal from '../Modal/Modal';
import ProgressBar from '../ProgressBar/ProgressBar';
import Spotify from '../../util/Spotify';
import logo from './logo.svg';
import './App.css';

//const appRoot = document.getElementById('root');
//const modalRoot = document.getElementById('modal-root');




class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: 'Enter A Song Title',
            searchResults: [],
            playlistName: 'New Playlist',
            playlist: [],
            playlistSaveProgress: 0,
            progressBarOpen: false,
            trackInProcess: {}
        }
        this.search = this.search.bind(this);
        this.searchBarOnChange = this.searchBarOnChange.bind(this);
        this.searchBarOnKeyDown = this.searchBarOnKeyDown.bind(this);
        this.trackActionOnClick = this.trackActionOnClick.bind(this);
        this.playlistSaveOnClick = this.playlistSaveOnClick.bind(this);
        this.playlistNameOnChange = this.playlistNameOnChange.bind(this);
        
        this.el = document.createElement('div');
    

    }

    component

    componentDidMount() {
        //extract state from url to get the searchText input before authentication redirecting.
        const state = window.location.href.match(/state=([^&]*)/);
        
        if (state) {
            let stateJSON = JSON.parse(decodeURIComponent(state[0].split('=')[1]));
            this.setState({
                searchText: stateJSON.searchText
            });
        } else {
            this.setState({
                searchText: 'Enter A Song Title'
            });
        }
    
    }


 
    search() {
        
        Spotify.search(this.state.searchText).then(searchResultsRaw => {
            let tracks = [];
            searchResultsRaw.tracks.items.map(item => {
                tracks.push({
                    id: item.id,
                    trackName: item.name,
                    singer: item.artists[0].name,
                    album: item.album.name,
                    uri: item.uri
                });
                return tracks;
            })
            
            this.setState(
                { 'searchResults': tracks }
            );
        })

        
    }

    searchBarOnChange(searchText) {
        this.setState(
            {searchText: searchText}
        );
    }

    searchBarOnKeyDown(keynum) {
        if (keynum === 13) {
            this.search();
        }
    }

    playlistNameOnChange(playlistName) {
     
        this.setState({
            playlistName: playlistName
        });
    }

   

    playlistSaveOnClick() {
    
        if (this.state.playlistSaveProgress === 0 && !this.state.progressBarOpen) {
            
            this.setState({
                progressBarOpen: true
            });
        } 


        Spotify.playlistSave(this.state.playlistName, this.state.playlist).then(() => {
            
            this.setState(
                {
                    playlistName: 'New Playlist',
                    playlist: [],
                    playlistSaveProgress: 0,
                    progressBarOpen: false
                    
                }
            )
            
            
        });

        
    }


    trackActionOnClick(listType, track) {
        
        
        if (listType === "SearchResults") {
            this.setState((prevState, props) => {
                let newPlaylist = prevState.playlist;
                if (!newPlaylist.length) {
                    newPlaylist.push(track);
                } else if (
                    !prevState.playlist.find(playlistItem => {
                        return playlistItem.uri === track.uri;
                    })) {
                    newPlaylist.push(track);
                }
                
                return { playlist: newPlaylist };
            });
        } else {
            this.setState((prevState, props) => {
                let newPlaylist = [];
                prevState.playlist.map(playlistItem => {
                    console.log("playlistItem.uri=" + playlistItem.uri);
                    if (playlistItem.uri !== track.uri) {

                        newPlaylist.push(playlistItem);
                    }
                    return newPlaylist;
                });
                
                return { playlist: newPlaylist };
            });

        }
        
    }

    render() {

        const progressBar = this.state.progressBarOpen ? (
            <Modal>
                <div className="modal">
                    <ProgressBar id="progressBar" playlistName={this.state.playlistName} type="dashboard" playlistSaveProgress={this.state.playlistSaveProgress}/>
                </div>
            </Modal>
        ): null;

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar searchBarOnClick={this.search}
                        searchBarOnKeyDown={this.searchBarOnKeyDown}
                        searchText={this.state.searchText} onChange={this.searchBarOnChange} />
                    <div className="App-playlist">
                        <SearchResults tracks={this.state.searchResults} listType="SearchResults"
                            trackActionOnClick={this.trackActionOnClick} />
                            
                        <Playlist playlistName={this.state.playlistName} playlistNameOnChange={this.playlistNameOnChange}
                            tracks={this.state.playlist} listType="Playlist"
                            trackActionOnClick={this.trackActionOnClick}
                            playlistSaveOnClick={this.playlistSaveOnClick} />
                        {progressBar}

                    </div>
                </div>
                

            </div>
        );
    }
}

export default App;

