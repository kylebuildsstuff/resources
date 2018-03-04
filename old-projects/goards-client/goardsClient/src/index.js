import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import { store } from './store';
import AppContainer from 'containers/AppContainer';

// eslint-disable-next-line
injectGlobal`
  ${'' /* @font-face {
    font-family: 'Operator Mono';
    src: url('../fonts/Operator-Mono.ttf');
  } */}
  body {
    margin: 0;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
