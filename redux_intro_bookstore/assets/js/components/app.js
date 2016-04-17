import React, {Component} from 'react';
import BookList from '../containers/book-list.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
      </div>
    );
  }
}
