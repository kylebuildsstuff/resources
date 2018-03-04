export const constants = ((environment = 'local') => {
  let ROOT_URL;
  switch (environment) {
    case 'local':
      ROOT_URL = 'http://localhost:8000';
      break;
    default:
      ROOT_URL = 'http://localhost:8000';
  }

  return {
    // App-wide
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    REGISTER_REQUEST: 'REGISTER_REQUEST',

    AUTHENTICATING: 'AUTHENTICATING',
    AUTHENTICATED: 'AUTHENTICATED',
    REDUX_STATE_CLEAR: 'REDUX_STATE_CLEAR',

    VERIFY_TOKEN: 'VERIFY_TOKEN',

    // URLs
    ROOT_URL: ROOT_URL,
    TOKEN_OBTAIN_URL: `${ROOT_URL}/token/`,
    TOKEN_VERIFY_URL: `${ROOT_URL}/verify/`,
  };
})();

export default Object.assign({}, constants);
