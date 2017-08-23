import { createStore, applyMiddleware, compose } from "redux";
import { connectRoutes } from "redux-first-router";
import createHistory from "history/createBrowserHistory";
import { createEpicMiddleware } from "redux-observable";

import createRootReducer from "reducer";
import createRootEpic from "epics";
import { routePathMap } from "modules/location/location.constants";

const composeEnhancers =
  typeof window === "object" &&
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

export function configureStore() {
  const history = createHistory();
  const {
    reducer: routesReducer,
    middleware: routeMiddleware,
    enhancer: routeEnhancer
  } = connectRoutes(history, routePathMap);
  const epicMiddleware = createEpicMiddleware(createRootEpic());

  const middlewares = [routeMiddleware, epicMiddleware];
  const store = createStore(
    createRootReducer({
      location: routesReducer
    }),
    {},
    composeEnhancers(routeEnhancer, applyMiddleware(...middlewares))
  );
  return store;
}

export default configureStore;
