/*
 *
 * HomePage reducer
 *
 */

import Immutable, { fromJS } from 'immutable';
import {
  TODOS_FETCHED,
} from './constants';

const initialState = Immutable.Map({
  todos: Immutable.List(),
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case TODOS_FETCHED:
      return state.update('todos', (val) => val.merge(action.payload.data));
    default:
      return state;
  }
}

export default homePageReducer;
