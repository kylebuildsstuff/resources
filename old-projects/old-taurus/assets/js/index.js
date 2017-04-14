import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, browserHistory} from 'react-router';
import promise from 'redux-promise';

import reducers from './reducers/index';
import routes from './routes';

import App from './containers/app';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
export var store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.getElementById('react-container'));
