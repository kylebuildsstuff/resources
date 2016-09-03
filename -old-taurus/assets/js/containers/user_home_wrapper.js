import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {logoutUser} from '../actions/index';

import UserHome from './user_home';

export default class UserHomeWrapper extends Component {

  render() {
    return (
      <div className="main-layout">
        <nav className="navbar navbar-light bg-faded">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/home/about">About</Link>
            </li>
            <li className="nav-item" onClick={this.props.logoutUser}>
            <Link to="/">Logout</Link>
            </li>
          </ul>
        </nav>
        <hr />

        <div>
          {this.props.children}
        </div>

        <hr />
        <footer>
          <small>Copyright 2016</small>
        </footer>

      </div>
    );
  }
}

export default connect(null, {logoutUser})(UserHomeWrapper);
