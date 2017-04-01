import React from 'react';
import ReactDOM from 'react-dom';
// import { DockableSagaView } from 'redux-saga-devtools';
// import { monitor } from './store/configureStore';
import App from './App';

// redux additions
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// master css
import './index.css';

const store = configureStore();

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <DockableSagaView hide monitor={monitor} /> */}
  </div>,
  document.getElementById('root')
);
