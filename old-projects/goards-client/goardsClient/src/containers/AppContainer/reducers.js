import constants from './constants';

export const initialState = {
  authenticating: false,
  authenticated: false,
};

export function appReducer(state = initialState, action) {
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
    default:
      return state;
  }
}

export default appReducer;
