import * as types from './constants';

const initialState = {
  authed: false,
  sending: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authed: action.authed,
        sending: action.sending,
      });
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
};
