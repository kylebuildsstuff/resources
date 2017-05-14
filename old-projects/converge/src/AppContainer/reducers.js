// @flow
import _ from 'lodash'
import constants from './constants';

type InitialStateType = {
  authenticating: boolean,
  authenticated: boolean,
  goals: Array<?Object>,
  user: Object
}

type GenericAction = {
  type: string,
  goals?: Array<?Object>,
  data?: Object | Array<mixed>,
  user?: Object,
  goalId?: ?number,
  status?: boolean,
}

export const initialState: InitialStateType = {
  authenticating: false,
  authenticated: false,
  goals: [],
  user: {},
};

export function globalReducer(state: InitialStateType = initialState, action: GenericAction) {
  switch (action.type) {
    // Authentication
    case constants.AUTHENTICATING:
      return Object.assign({}, state,
        {
          authenticating: action.status,
        }
      );
    case constants.AUTHENTICATED:
      return Object.assign({}, state,
        {
          authenticated: action.status,
        }
      );
    // Goals
    case constants.GOAL_CREATED:
      return Object.assign({}, state,
        {
          goals: _.concat(state.goals, action.data),
        }
      );
    case constants.GOALS_FETCHED:
      return Object.assign({}, state,
        {
          goals: action.goals,
        }
      );
    case constants.GOAL_EDITED:
      const filteredGoals = _.filter(state.goals, (value, index) => {
        return value.id !== action.goalId;
      })
      return Object.assign({}, state,
        {
          goals: _.concat(filteredGoals, action.data),
        }
      );
    case constants.GOAL_DELETED:
      return Object.assign({}, state,
        {
          goals: _.filter(state.goals, (value, index) => {
            return value.id !== action.goalId;
          }),
        }
      );
    // Users
    case constants.USER_EDITED:
    case constants.USER_FETCHED:
      return Object.assign({}, state,
        {
          user: action.user,
        }
      );
    default:
      return state;
  }
}

export default globalReducer;
