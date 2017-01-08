import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './components/App/sagas'

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const middlewares = [
    sagaMiddleware,
  ];
  const enhancers = [
    applyMiddleware(...middlewares),
    devTools,
  ];

  const store = createStore(
    rootReducer,  // Reducer
    {},           // Preloaded State
    compose(...enhancers),  // Enhancers
  );
  
  sagaMiddleware.run(rootSaga)
  return store;
};
