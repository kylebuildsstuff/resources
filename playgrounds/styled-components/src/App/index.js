import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import BaseTemplate from '../BaseTemplate';
import NoMatch from '../NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match pattern="/" component={BaseTemplate} />
          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
