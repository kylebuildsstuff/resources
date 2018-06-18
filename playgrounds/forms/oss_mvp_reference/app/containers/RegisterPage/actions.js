/*
 *
 * RegisterPage actions
 *
 */

import {
  REGISTER_REQUEST,
} from './constants';

export function register(values, resolve, reject) {
  return {
    type: REGISTER_REQUEST,
    values,
    resolve,
    reject,
  };
}
