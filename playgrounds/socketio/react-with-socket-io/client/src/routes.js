import React from 'react';
import { Router, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import Room from './Room';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/rooms/:id" component={Room} />
  </Route>
);
