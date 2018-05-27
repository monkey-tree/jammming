import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
    
    render() {
        //console.log(this.props);
       
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map((track, index) => {
                        return <Track listType={this.props.listType} id={this.props.listType + index.toString()}
                            key={index.toString()}
                            trackActionOnClick={this.props.trackActionOnClick}
                            track={track}
                            trackAction={this.props.trackAction} />;
                    })
                }
            </div>
            

        );
    }
}

export default TrackList;