import React from 'react';

import Sidebar from 'components/Sidebar';
import Body from 'components/Body';

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Body />
      </div>
    );
  }
}

export default App;
