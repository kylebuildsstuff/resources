import { createStore, applyMiddleware } from 'redux';
import { createRouter } from '@respond-framework/rudy';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, Action } from 'redux';

import { appRoutes } from 'src/routes/routes.constants';
import { pageReducer } from 'src/routes/page.reducers';
import { GenericObject } from 'src/shared/shared.types';

import {
  combineEpics,
  StateObservable,
  createEpicMiddleware,
} from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import { StoreState } from './store.types';

const pingEpic = (
  action$: Observable<Action>,
  state$: StateObservable<StoreState>,
): Observable<Action> =>
  action$.pipe(
    filter(action => action.type === 'PING'),
    mapTo({ type: 'PONG' }),
  );

export const createRootEpic = () => combineEpics(pingEpic);

export const createRootReducer = (extraReducers = {}) => {
  return combineReducers({
    ...extraReducers,
  });
};

export const configureStore = (
  initialState?: GenericObject,
  initialEntries?: GenericObject,
) => {
  const options = { initialEntries };
  const { reducer, middleware, firstRoute } = createRouter(appRoutes, options);
  const epicMiddleware = createEpicMiddleware();

  const middlewares = applyMiddleware(middleware, epicMiddleware);
  const enhancers = composeWithDevTools(middlewares);

  const store = createStore(
    createRootReducer({ page: pageReducer, location: reducer }),
    initialState,
    enhancers,
  );
  epicMiddleware.run(createRootEpic() as any);

  return { store, firstRoute };
};

export default configureStore;
