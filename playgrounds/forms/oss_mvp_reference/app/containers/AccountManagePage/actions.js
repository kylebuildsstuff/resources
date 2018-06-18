/*
 *
 * AccountManagePage actions
 *
 */

import {
  CHANGE_PW_REQUEST,
} from './constants';

export function changePw(values, resolve, reject) {
  return {
    type: CHANGE_PW_REQUEST,
    values,
    resolve,
    reject,
  };
}
