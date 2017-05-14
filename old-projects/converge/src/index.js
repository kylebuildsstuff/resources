import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { configureStore } from './store'
import AppContainer from './AppContainer'

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
