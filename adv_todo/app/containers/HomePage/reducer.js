/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATED_TODO,
} from './constants';

const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATED_TODO:
      console.log('hitting reducer');
      console.log(action.payload.data);
      return fromJS(Object.assign({}, action.payload.data));
    default:
      return state;
  }
}

export default homePageReducer;
