import React from 'react';
import './Track.css';



class Track extends React.Component {

    render() {

        //console.log(this.props);
        return (
            
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.trackName}</h3>
                    <p>{`${this.props.track.singer} | ${this.props.track.album}`}</p>
                </div>
                <a className="Track-action">{this.props.track.trackAction}</a>
            </div>
        );
    }
}


export default Track;