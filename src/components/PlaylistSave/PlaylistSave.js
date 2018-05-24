import React from 'react';
import './PlaylistSave.css';


class PlaylistSave extends React.Component {

    render() {

        return (
            <a className="Playlist-save" onClick={this.props.onClick}>SAVE TO SPOTIFY</a>
        );
    }
}

export default PlaylistSave;