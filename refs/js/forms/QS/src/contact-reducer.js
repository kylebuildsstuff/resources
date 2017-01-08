import * as types from './constants';

const initialState = {
  contact: {},
  policies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACT_DATA_SUCCESS:
      return Object.assign({}, state, {
        contact: action.contact,
        policies: action.policies,
      });
    default:
      return state;
  }
};
