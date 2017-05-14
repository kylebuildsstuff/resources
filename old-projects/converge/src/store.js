import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './AppContainer/rootSagas';
import rootReducer from './reducers';

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
