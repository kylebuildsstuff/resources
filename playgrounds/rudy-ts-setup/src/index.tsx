require('babel-polyfill');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './core/store/store.utils';
import App from './components/app/app.container';

const { store, firstRoute } = configureStore();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
}

store.dispatch(firstRoute()).then(() => render());

registerServiceWorker();
