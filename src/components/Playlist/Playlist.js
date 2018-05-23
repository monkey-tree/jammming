import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';



class Playlist extends React.Component {

    render() {

        return (
            <div class="Playlist">
                <input value='New Playlist' />
                <div class="TrackList">
                    {
                        this.props.searchTracks.map(track => {
                            return <track track={track} />;
                        })
                    }
                </div>
                <a class="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    
    }
}

export default Playlist;