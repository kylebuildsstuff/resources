import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import returnTheme from 'styles/theme';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from 'containers/AppContainer';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={returnTheme()}>
      <AppContainer />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
