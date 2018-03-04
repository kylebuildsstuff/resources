import constants from './constants'

// Auth
export function register(formSubmitData) {
  return {
    type: constants.REGISTER_REQUEST,
    formSubmitData: formSubmitData,
  };
}

export function login(formSubmitData) {
  return {
    type: constants.LOGIN_REQUEST,
    formSubmitData: formSubmitData,
  }
}

export function logout() {
  return {
    type: constants.LOGOUT_REQUEST,
  }
}

export function clearReduxState() {
  return {
    type: constants.REDUX_STATE_CLEAR,
  }
}

export function verifyToken(jwt, callback = null) {
  return {
    type: constants.VERIFY_TOKEN,
    token: jwt,
    callback: callback,
  };
}

export function switchAuthenticatedFlag(status) {
  return {
    type: constants.AUTHENTICATED,
    status: status,
  };
}

export function switchAuthenticatingFlag(status) {
  return {
    type: constants.AUTHENTICATING,
    status: status,
  };
}
