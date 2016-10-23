import React from 'react';
import { BrowserRouter, Miss, Link, Match } from 'react-router';

import Home from '../Home/index';
import One from '../One/index';
import Two from '../Two/index';
import Three from '../Three/index';
import NoMatch from '../NoMatch/index';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/one">One</Link></li>
            <li><Link to="/two">Two</Link></li>
            <li><Link to="/three">Three</Link></li>
          </ul>

          <hr />

          <Match exactly pattern="/" component={Home} />
          <Match pattern="/one" component={One} />
          <Match pattern="/two" component={Two} />
          <Match pattern="/three" component={Three} />

          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
