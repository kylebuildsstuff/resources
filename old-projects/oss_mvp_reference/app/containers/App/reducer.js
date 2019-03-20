
/*
 * AppReducer
 */

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SENDING,
  REQUEST_ACCOUNT_DATA,
  REQUEST_DATA_SUCCESS,
  SET_GLOBAL_MESSAGE,
  SET_FORM_IN_PROGRESS,
  ACTIVATE_MODAL,
  TOGGLE_MENU,
  SET_HEALTH_STATUS,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  sending: false,
  authed: false,
  health: true,
  // loggedin
  globalMessage: '',
  formInProgress: false,
  primary: {},
  policies: [],
  ui: {
    // modal
    modalActive: false,
    nextPath: '',
    modalTitle: '',
    modalBody: '',
    // menus
    menuActive: false,
    miniNavActive: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SENDING:
      return state
        .set('sending', action.sending);
    case LOGIN_SUCCESS:
      console.log('%c ** reducer: LOGIN_SUCCESS **', 'color: green;');
      return state
        .set('authed', action.authed);
    case LOGIN_ERROR:
      console.log('%c ** reducer: LOGIN_ERROR **', 'color: green;');
      return state
        .set('authed', action.authed);
    case LOGOUT_SUCCESS:
      console.log('%c ** reducer: LOGOUT_SUCCESS **', 'color: green;');
      return state
        .set('authed', false)
        .set('primary', {})
        .set('policies', []);
    case REQUEST_ACCOUNT_DATA:
      return state;
    case REQUEST_DATA_SUCCESS:
      return state
        .set('primary', action.primary)
        .set('policies', action.policies);
    case SET_GLOBAL_MESSAGE:
      return state
        .set('globalMessage', action.globalMessage);
    case SET_HEALTH_STATUS:
      return state
        .set('health', action.health);
    case SET_FORM_IN_PROGRESS:
      return state
        .set('formInProgress', action.formInProgress);
    case ACTIVATE_MODAL:
      return state
        .setIn(['ui', 'modalActive'], action.modalActive)
        .setIn(['ui', 'nextPath'], action.nextPath)
        .setIn(['ui', 'modalTitle'], action.modalTitle)
        .setIn(['ui', 'modalBody'], action.modalBody);
    case TOGGLE_MENU:
      return state
        .setIn(['ui', 'menuActive'], action.active);
    default:
      return state;
  }
}

export default appReducer;
