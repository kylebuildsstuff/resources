import React, {Component} from 'react';
import {connect} from 'react-redux';


export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      term: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
        className="input-group">
        <input
          placeholder="Get a five-day forecast in favourite cities"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
          />
        <span>
          <button
            type="submit"
            className="btn btn-secondary">
              Submit
          </button>
        </span>
      </form>
    );
  }
}
