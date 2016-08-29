/*
 *
 * HomePage reducer
 *
 */

import Immutable from 'immutable';
import {
  TODOS_FETCHED,
} from './constants';

const initialState = Immutable.Map({
  todos: Immutable.List(),
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case TODOS_FETCHED:
      console.log('%c TODOS_FETCHED Reducer', 'color: green');
      return (state.update('todos', (val) => val.clear().merge(action.payload.data)
      ));
    default:
      return state;
  }
}

export default homePageReducer;
