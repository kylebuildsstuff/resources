import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function reducer(state=1, action) {
  switch (action.type) {
    default:
      return state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
