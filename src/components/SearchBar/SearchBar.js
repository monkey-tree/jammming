import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const searchText = e.target.value;
        //console.log('searchText=' + searchText);
        this.props.onChange(searchText);
    }

    render() {

        //console.log("SearchBar: this.propos:");
        //console.log(this.props);
        return (
            <div className="SearchBar">
                <input placeholder={this.props.searchText} onChange={this.handleChange} />
                <a onClick={this.props.onClick}>SEARCH</a>
            </div>


        );
    }
}

export default SearchBar;