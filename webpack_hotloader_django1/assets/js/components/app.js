import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

import '../../styles/test_app/scss/app.scss';
import NavLink from './nav_link';


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>This is the Appsdssdas</h1>
        <ul>
          <li><NavLink to='/' onlyActiveOnIndex={true}>Main Page</NavLink></li>
          <li><NavLink to='/repos'>Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
