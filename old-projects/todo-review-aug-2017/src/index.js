import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import GlobalContainer from 'containers/GlobalContainer';
import configureStore from 'store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
