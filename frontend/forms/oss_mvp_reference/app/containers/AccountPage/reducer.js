/*
 *
 * AccountPage reducer
 *
 */

import {
  VEH_MAKES_FETCHED,
  VEH_MODELS_FETCHED,
  ADDRESSES_FETCHED,
  ADDRESSES_CLEAR,
  GEN_MSG_FORM_SUBMIT_SUCCESS,
  JASMINE_API_FETCHING,
  ACCOUNT_PAGE_CLEAR_STATE,
} from './constants';

const initialState = ({
  vehMakes: [],
  vehModels: [],
  addresses: [],
  isFetching: false,
  genMsgFormSubmitSuccess: false,
});

function AccountPageReducer(state = initialState, action) {
  switch (action.type) {
    case VEH_MAKES_FETCHED:
      return Object.assign({}, state, { vehMakes: action.vehMakes });
    case VEH_MODELS_FETCHED:
      return Object.assign({}, state, { vehModels: action.vehModels });
    case ADDRESSES_FETCHED:
      return Object.assign({}, state, { addresses: action.addresses });
    case ADDRESSES_CLEAR:
      return Object.assign({}, state, { addresses: [] });
    case GEN_MSG_FORM_SUBMIT_SUCCESS:
      return Object.assign({}, state, { genMsgFormSubmitSuccess: true });
    case JASMINE_API_FETCHING:
      return Object.assign({}, state, { isFetching: action.fetching });
    case ACCOUNT_PAGE_CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default AccountPageReducer;
