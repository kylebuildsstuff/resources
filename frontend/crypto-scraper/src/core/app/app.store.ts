import { createStore, compose, applyMiddleware, Middleware } from 'redux';
// import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './app.reducers';

const middlewares: Array<Middleware> = [];
const enhancers =
  process.env.REACT_APP_ENV !== 'prod'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares));

export const createNewStore = () => {
  return createStore(createRootReducer(), {}, compose(enhancers));
};

export default createNewStore;
