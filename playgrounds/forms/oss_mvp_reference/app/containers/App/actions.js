/*
 *
 * App actions
 *
 */

import {
  LOGIN,
  LOGOUT,
  REQUEST_ACCOUNT_DATA,
  SET_FORM_IN_PROGRESS,
  ACTIVATE_MODAL,
  TOGGLE_MENU,
  EVENT_DETECTOR,
  // FETCH_DATA_SUCCESS,
} from './constants';

export function login(values, resolve, reject) {
  return { type: LOGIN, values, resolve, reject };
}

export function logout() {
  console.log('%c ** action: LOGOUT **', 'color: green;');
  return { type: LOGOUT };
}

export function requestAcctData() {
  return {
    type: REQUEST_ACCOUNT_DATA,
  };
}

export function setFormInProgress(set) {
  return { type: SET_FORM_IN_PROGRESS, formInProgress: set };
}

export function activateModal(active, path, title, body) {
  return { type: ACTIVATE_MODAL, modalActive: active, nextPath: path, modalTitle: title, modalBody: body };
}

export function eventDetector(timer) {
  return { type: EVENT_DETECTOR, timer };
}

// ui

export function toggleMenu(active) {
  return { type: TOGGLE_MENU, active };
}
