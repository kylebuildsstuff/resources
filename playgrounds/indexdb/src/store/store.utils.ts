import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createRouter } from '@respond-framework/rudy';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appRoutes } from 'src/routes/routes.constants';
import { pageReducer } from 'src/routes/page.reducers';
import { GenericObject } from 'src/shared/shared.types';

const createRootReducer = (extraReducers = {}) => {
  return combineReducers({
    app: (state = { say: 'what' }, action = { type: 'something' }) => {
      return state;
    },
    ...extraReducers,
  });
};

export const configureStore = (
  initialState?: GenericObject,
  initialEntries?: GenericObject,
) => {
  const options = { initialEntries };
  const { reducer, middleware, firstRoute } = createRouter(appRoutes, options);
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeWithDevTools(middlewares);

  const store = createStore(
    createRootReducer({ page: pageReducer, location: reducer }),
    initialState,
    enhancers,
  );

  return { store, firstRoute };
};

export default configureStore;
