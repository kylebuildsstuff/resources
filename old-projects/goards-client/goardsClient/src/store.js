import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducers';
import { rootSaga } from './rootSagas';

// sagas
const sagaMiddleware = createSagaMiddleware();

// dev-tools
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

  // NOTE: May need to asynchronously inject sagas depending on how performance goes.
  sagaMiddleware.run(rootSaga);
  return store;
}

// If imported from another file for the purposes of store.dispatch, it will return the
// same store used by <Provider /> and not a new instance of a store. Tested and confirmed
// that configureStore only gets called once even though imported twice in different files.

// However, Redux Middleware is a much cleaner and integrated solution
// for most problems rather than manually dispatching actions.
export const store = configureStore();
