import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createSagaMonitor } from 'redux-saga-devtools';

import root from '../sagas';

export const monitor = createSagaMonitor();

const enhancers = window.devToolsExtension ? window.devToolsExtension() : f => f;

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });
  return {
    ...createStore(
      rootReducer,
      enhancers,
      applyMiddleware(sagaMiddleware),
    ),
    runSaga: sagaMiddleware.run(root),
  };
};
