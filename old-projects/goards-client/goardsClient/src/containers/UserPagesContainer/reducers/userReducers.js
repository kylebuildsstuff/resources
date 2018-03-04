import constants from 'containers/UserPagesContainer/constants';

export const initialState = {};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case constants.USER_CREATED:
    case constants.USER_EDITED:
    case constants.USER_FETCHED:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};

export default userReducer;
