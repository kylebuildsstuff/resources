import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers/index.js';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
, document.getElementById('react-container'));


  //  middleware:: next -> action -> retVal
  // export default function applyMiddleware(...middlewares) {
  //   return (next) =>
  //     (reducer, initialState) => {
  //       var store = next(reducer, initialState);
  //       var dispatch = store.dispatch;
  //       var chain = [];
  //
  //       var middlewareAPI = {
  //         getState: store.getState,
  //         dispatch: (action) => dispatch(action)
  //       };
  //
  //       chain = middlewares.map(middleware =>
  //                        middleware(middlewareAPI));
  //
  //       dispatch = compose(...chain, store.dispatch);
  //
  //       return {
  //         ...store,
  //         dispatch
  //       };
  //    };
  // }

  // applyMiddleware is like a python decorator that wraps the normal store object.
  // It wraps it with functionalities to apply middleware.

  // Middleware is just something that manipulates that action payload before
  // the main dispatch method.

  // applyMiddleware uses function composition and currying
  // 'next' is just a store creator.

  // middlewareAPI is an object injected to every middleware that is optionally used.
  // chain stores all the middlewares

  // 'compose' is supplied by redux:

//  export default function compose(...funcs) {
//  return funcs.reduceRight((composed, f) => f(composed));
// }
  // reduceRight is js method that applies a function against an accumulator
  // and each value of the array from right to left has to reduce it to a single value

  // therefore, all the compose fn does is to express my functions as a composition
  // injecting each middleware as an argument to the next middleware in the chain.
