/*
 *
 * TodoWrapper reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TODOS_REQUESTED,
} from './constants';

const initialState = fromJS([]);

function todoWrapperReducer(state = initialState, action) {
  switch (action.type) {
    case TODOS_REQUESTED:
      return state.push(...action.payload.data);
    default:
      return state;
  }
}

export default todoWrapperReducer;
