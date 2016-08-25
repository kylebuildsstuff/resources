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
      console.log('-- Reducer --');
      return (state.update('todos', (val) => {
        return val.clear().merge(action.payload.data)
      }));
    default:
      return state;
  }
}

export default homePageReducer;
