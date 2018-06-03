import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e) {
        const searchText = e.target.value;
        //console.log('searchText=' + searchText);
        this.props.onChange(searchText);
    }

    handleKeyDown(e) {
        //console.log("handleKeyDown");
        let keynum;
        keynum = window.event ? e.keyCode : e.which;

        //console.log(keynum);
        if (keynum === 13) {
            this.props.searchBarOnKeyDown(keynum);
        } else {
            this.handleChange(e);
        }
    }

    render() {

        //console.log("SearchBar: this.propos:");
        //console.log(this.props);
        return (
            <div className="SearchBar">
                <input placeholder={this.props.searchText} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                <a onClick={this.props.searchBarOnClick}>SEARCH</a>
            </div>


        );
    }
}

export default SearchBar;