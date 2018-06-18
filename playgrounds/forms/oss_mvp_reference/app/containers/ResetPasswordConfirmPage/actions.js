/*
 *
 * ResetPasswordConfirmPage actions
 *
 */

import {
  CONFIRM_RESET_PASSWORD,
} from './constants';

export function confirmResetPassword(values, uuid, token, resolve, reject) {
  return {
    type: CONFIRM_RESET_PASSWORD,
    values,
    uuid,
    token,
    resolve,
    reject,
  };
}
