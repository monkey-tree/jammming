import React from 'react';
import './Playlist.css';
import PlaylistSave from '../PlaylistSave/PlaylistSave';
import TrackList from '../TrackList/TrackList';



class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.playlistNameOnChange = this.playlistNameOnChange.bind(this);

    }


    playlistNameOnChange(e) {
        const playlistName = e.target.value;
        this.props.playlistNameOnChange(playlistName);
    }


    render() {

        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.playlistNameOnChange} />
                <TrackList tracks={this.props.tracks} listType="Playlist"
                    trackActionOnClick={this.props.trackActionOnClick} />
                <PlaylistSave playlistSaveOnClick={this.props.playlistSaveOnClick} />
            </div>
        );
    
    }
}

export default Playlist;