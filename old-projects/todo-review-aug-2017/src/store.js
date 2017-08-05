import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from 'rootReducer';
import { rootSaga } from 'rootSaga';

// sagas
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = typeof window === 'object' && (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) : compose
);

export function configureStore() {
  const middlewares = [
    sagaMiddleware,
  ];
  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
