import React from 'react';
import './Track.css';



class Track extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        //console.log(this.props);
        this.props.trackActionOnClick(this.props.listType, this.props.track);
    }

    render() {

        //console.log(this.props);
        return (
            
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.trackName}</h3>
                    <p>{`${this.props.track.singer} | ${this.props.track.album}`}</p>
                </div>
                <a className="Track-action" onClick={this.handleOnClick}>{this.props.listType === "SearchResults" ? '+' : '-'}</a>
            </div>
        );
    }
}


export default Track;