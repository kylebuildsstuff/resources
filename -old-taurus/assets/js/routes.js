import React from 'react';
import {Route, IndexRoute} from 'react-router';

import UserRegister from './containers/user_register';
import UserLogin from './containers/user_login';
import UserHome from './containers/user_home';
import UserHomeWrapper from './containers/user_home_wrapper';

import App from './containers/app';
import Landing from './containers/landing';
import InfoPage from './containers/info_page';
import SimpleLayout from './containers/simple_layout';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
    <Route component={SimpleLayout}>
      <Route path="login" component={UserLogin}/>
      <Route path="register" component={UserRegister}/>
    </Route>

    <Route path="home" component={UserHomeWrapper}>
      <IndexRoute component={UserHome}/>
      <Route path="about" component={InfoPage}/>
    </Route>
  </Route>
)
