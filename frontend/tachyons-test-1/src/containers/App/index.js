import React from 'react';
import 'tachyons';

import Body from 'components/Body';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
