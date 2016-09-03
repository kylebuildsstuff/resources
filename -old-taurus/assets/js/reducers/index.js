import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import userInfoReducer from './userInfo';
import goalsReducer from './goals';

import {LOGOUT_USER} from '../actions/types';


const appReducer = combineReducers({
  form: formReducer,
  userInfo: userInfoReducer,
  goals: goalsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    localStorage.clear()

    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
