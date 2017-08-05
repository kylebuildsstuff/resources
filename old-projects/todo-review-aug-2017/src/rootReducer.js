import { combineReducers } from 'redux';

import {
  globalReducer,
} from 'containers/GlobalContainer/reducers';
import {
  appReducer,
} from 'containers/AppContainer/reducers';

export function rootReducer(state = {}, action) {
  switch (action.type) {
    default:
      return (
        combineReducers({
          global: globalReducer,
          app: appReducer,
        })(state, action)
      );
  }
}

export default rootReducer;
