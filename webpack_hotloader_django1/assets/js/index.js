import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, browserHistory, hashHistory} from 'react-router'

import App from './components/app';
import MainPage from './components/main_page';
import GlobalNav from './components/global_nav';
import LocalNav from './components/local_nav';
import Repo from './components/repo';
import Repos from './components/repos';


ReactDOM.render((
  <Router history={browserHistory}>

    <Route path='/' component={App}>
      <IndexRoute component={MainPage} />
      <Route path='repos' component={Repos}>
        <Route path=":userName/:repoName" component={Repo} /></Route>
    </Route>

  </Router>
), document.querySelector('#react-container'))
