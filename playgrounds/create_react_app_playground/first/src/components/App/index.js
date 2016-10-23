import React, { Component } from 'react';
import { BrowserRouter, Link, Miss, Match } from 'react-router';

import './styles.css';
import Home from '../Home/index';
import About from '../About/index';
import Topics from '../Topics/index';
import NoMatch from '../NoMatch/index';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr />
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />
          <Match pattern="/topics" component={Topics} />

          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
