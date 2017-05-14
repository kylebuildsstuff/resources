import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import constants from './AppContainer/constants';
import {
  globalReducer,
} from './AppContainer/reducers';

type actionType = {
  type: string,
}

export function rootReducer(state: Object = {}, action: actionType) {
  switch (action.type) {
    case constants.REDUX_STATE_CLEAR:
      return Object.assign(
        {},
        combineReducers({
          global: globalReducer,
          form: formReducer,
        })({}, action)
      );
    default:
      return (
        combineReducers({
          global: globalReducer,
          form: formReducer,
        })(state, action)
      );
  }
}

export default rootReducer;
