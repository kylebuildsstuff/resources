import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import Base from '../Base';
import NoMatch from '../Base/NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match pattern="/" component={Base} />
          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
