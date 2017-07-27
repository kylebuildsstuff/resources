import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, broswerHistory } from 'react-router';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
