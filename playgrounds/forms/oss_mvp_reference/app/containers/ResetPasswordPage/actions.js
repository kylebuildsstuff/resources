/*
 *
 * ResetPasswordPage actions
 *
 */

 import {
   RESET_PASSWORD_REQUEST,
 } from './constants';

 export function resetPassword(values, resolve, reject) {
   return {
     type: RESET_PASSWORD_REQUEST,
     values,
     resolve,
     reject,
   };
 }
