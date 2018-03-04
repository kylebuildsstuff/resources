import { combineReducers } from 'redux'

import constants from 'containers/AppContainer/constants';
import {
  appReducer,
} from 'containers/AppContainer/reducers';
import {
  userPagesReducer,
} from 'containers/UserPagesContainer/reducers';

export function rootReducer(state, action) {
  switch (action.type) {
    case constants.REDUX_STATE_CLEAR:
      // Wipe Redux clean if logout action received
      return Object.assign(
        {},
        combineReducers({
          app: appReducer,
          userPages: userPagesReducer,
        })({}, action)
      );
    default:
      // Return normal Redux state otherwise.
      return (
        combineReducers({
          app: appReducer,
          userPages: userPagesReducer,
        })(state, action)
      );
  }
}

export default rootReducer;
