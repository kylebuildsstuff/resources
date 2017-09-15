import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
} from '../containers/App/constants';
import {
  ALL_PINK_SLIPS_FETCHED,
  PINK_SLIP_FETCHED,
  DOWNLOAD_PINK_SLIP_FETCHED,
  DOWNLOAD_ALL_PINK_SLIPS_FETCHED,
  VEH_ADD_FORM_POSTED,
  VEH_SUB_FORM_POSTED,
  ADDRESS_CHANGE_FORM_POSTED,
} from '../containers/AccountPage/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import auth from './authentication';

const HISTORY_URL = '/api/users/history/';

const historyRecorderMiddleware = store => next => action => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case LOGIN:
    case LOGIN_ERROR:
    case LOGIN_SUCCESS:
    case ALL_PINK_SLIPS_FETCHED:
    case PINK_SLIP_FETCHED:
    case DOWNLOAD_PINK_SLIP_FETCHED:
    case DOWNLOAD_ALL_PINK_SLIPS_FETCHED:
    case VEH_ADD_FORM_POSTED:
    case VEH_SUB_FORM_POSTED:
    case ADDRESS_CHANGE_FORM_POSTED: {
      const data = { action: action.type };
      const token = auth.getAuthToken();
      if (token) {
        auth.postWithToken(HISTORY_URL, data, token);
      } else {
        auth.post(HISTORY_URL, data);
      }
      break;
    }
    case LOCATION_CHANGE: {
      const data = { action: 'router/LOCATION_CHANGE', url: action.payload.pathname };
      const token = auth.getAuthToken();
      if (token) {
        auth.postWithToken(HISTORY_URL, data, token);
      } else {
        auth.post(HISTORY_URL, data);
      }
      break;
    }
    default:
      break;
  }
  return next(action);
};

export default historyRecorderMiddleware;
