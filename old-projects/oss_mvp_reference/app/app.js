/**
 * app.js
 *
 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import useScroll from 'react-router-scroll';
import LanguageProvider from 'containers/LanguageProvider';
import configureStore from './store';

// react google analytics setup
import ReactGA from 'react-ga';
ReactGA.initialize('UA-12836479-10');

const fireTracking = () => {
  ReactGA.pageview(window.location.pathname);
};

import { translationMessages } from './i18n';

import styles from 'containers/App/styles.css';
const robotoObserver = new FontFaceObserver('Roboto');

robotoObserver.load(null, 10000).then(() => {
  document.body.classList.add(styles.fontLoaded);
}, () => {
  document.body.classList.remove(styles.fontLoaded);
});

import 'sanitize.css/sanitize.css';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, browserHistory);

import { selectLocationState } from 'containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

import App from 'containers/App';
import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = (translatedMessages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={translatedMessages}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            applyRouterMiddleware(useScroll())
          }
          onUpdate={fireTracking}
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
};

if (module.hot) {
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'));
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache at the end
import { install } from 'offline-plugin/runtime';
install();
