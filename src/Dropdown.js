import React from 'react'
import './App.css'

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    state = {
        selectedValue: this.props.selectedValue !== undefined ? this.props.selectedValue : "none",
    }

    render() {
        return (
            <select onChange={this.onDropdownSelected} defaultValue={this.state.selectedValue}>
                <option value="na" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }

    onDropdownSelected(e) {
        this.props.onDropdownSelected(e.target.value, this.props.book);
        this.setState({
            selectedValue: e.target.value,
        })
    }
}

