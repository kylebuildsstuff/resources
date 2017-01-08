import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Miss } from 'react-router';
import Home from './Home';
import Account from './Account';
import About from './About';
import Login from './Login';
import Header from './Header';
import Sidebar from './Sidebar';
import Error from './Error';
import Modal from './Modal';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <Match exactly pattern="/" component={Home} />
          <Match pattern="/account" component={Account} />
          <Match pattern="/about" component={About} />
          <Match pattern="/login" component={Login} />
          <Miss component={Error} />

          <div className="Footer">
            &copy; 2016
          </div>
          <Sidebar authed={this.props.app.authed} sending={this.props.app.sending} />
          <Modal title="A Title for Modal" body="This is the modal body text" />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(App);
