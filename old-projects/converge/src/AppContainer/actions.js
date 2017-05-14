// @flow
import constants from './constants'

// Auth
export function signup(formSubmitData: Object = {}) {
  return {
    type: constants.SIGNUP_REQUEST,
    formSubmitData: formSubmitData,
  };
}

export function login(formSubmitData: Object = {}) {
  return {
    type: constants.LOGIN_REQUEST,
    formSubmitData: formSubmitData,
  }
}

export function logout(): { type: string } {
  return {
    type: constants.LOGOUT_REQUEST,
  }
}

export function clearReduxState(): { type: string } {
  return {
    type: constants.REDUX_STATE_CLEAR,
  }
}

export function verifyToken(jwt: string = '', callback: ?() => mixed = undefined) {
  return {
    type: constants.VERIFY_TOKEN,
    token: jwt,
    callback: callback,
  };
}

export function switchAuthenticatedFlag(status: boolean = false) {
  return {
    type: constants.AUTHENTICATED,
    status: status,
  };
}

export function switchAuthenticatingFlag(status: boolean = false) {
  return {
    type: constants.AUTHENTICATING,
    status: status,
  };
}

// Goals
export function createGoal(token: string = '') {
  return {
    type: constants.GOAL_CREATE_REQUEST,
    token: token,
  }
}

export function fetchGoals(token: string = '') {
  return {
    type: constants.GOALS_FETCH_REQUEST,
    token: token,
  };
}

export function editGoal(goalId: ?number = undefined, formSubmitData: ?Object = {}, token: ?string = undefined) {
  return {
    type: constants.GOAL_EDIT_REQUEST,
    goalId: goalId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteGoal(goalId: ?number = undefined, token: ?string = '') {
  return {
    type: constants.GOAL_DELETE_REQUEST,
    goalId: goalId,
    token: token,
  };
}

// Users
export function createUser(formSubmitData: Object = {}) {
  return {
    type: constants.USER_CREATE_REQUEST,
    formSubmitData: formSubmitData,
  };
}

export function fetchUser(userId: ?number = undefined, token: ?string = undefined) {
  return {
    type: constants.USER_FETCH_REQUEST,
    userId: userId,
    token: token,
  };
}

export function editUser(userId: ?number = undefined, formSubmitData: Object = {}, token: ?string = undefined) {
  return {
    type: constants.USER_EDIT_REQUEST,
    userId: userId,
    formSubmitData: formSubmitData,
    token: token,
  };
}
