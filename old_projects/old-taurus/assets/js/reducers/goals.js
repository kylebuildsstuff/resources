import {CREATE_GOAL, FETCH_USER_GOALS,
        DELETE_GOAL, EDIT_GOAL} from '../actions/types';
import _ from 'lodash';


export default function(state=[], action) {
  switch(action.type) {

    case CREATE_GOAL:
      return [...state, action.payload.data];

    case EDIT_GOAL:
      const newState = _.filter(state, (val, index) => {
        return val.url !== action.payload.data.url;
      });
      return [...newState, action.payload.data]

    case FETCH_USER_GOALS:
      return [...state, action.payload.data];

    case DELETE_GOAL:
      return _.filter(state, (val, index) => {
        return val.url !== action.payload;
      });

    default:
      return state;
  }
}
