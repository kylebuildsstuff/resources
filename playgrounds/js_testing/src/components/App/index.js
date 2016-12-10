import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import Home from '../Home';
import About from '../About';
import Topics from '../Topics';
import NoMatch from '../NoMatch';
import './styles.css';

const App = () => (
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

export default App;
