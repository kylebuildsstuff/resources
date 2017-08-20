import { createStore, applyMiddleware, compose } from "redux";
import { connectRoutes } from "redux-first-router";
import createHistory from "history/createBrowserHistory";

import createReducer from "reducer";
import { routePathMap } from "core/location/location.constants";

const composeEnhancers =
  typeof window === "object" &&
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

const history = createHistory();
const {
  reducer: routesReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer
} = connectRoutes(history, routePathMap);

export function configureStore() {
  const middlewares = [routeMiddleware];
  const store = createStore(
    createReducer({
      location: routesReducer
    }),
    {},
    composeEnhancers(routeEnhancer, applyMiddleware(...middlewares))
  );
  return store;
}

export default configureStore;
