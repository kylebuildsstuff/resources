/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TODO_CREATED,
} from './constants';

const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case TODO_CREATED:
      return state.set('homePage', action.payload.data)
    default:
      return state;
  }
}

export default homePageReducer;
