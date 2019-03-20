/*
 *
 * AccountPage actions
 *
 */

import {
  VEH_MAKES_FETCH,
  VEH_MODELS_FETCH,
  ADDRESSES_FETCH,
  GEN_MSG_FORM_SUBMIT_SUCCESS,
  VEH_ADD_FORM_POST,
  VEH_SUB_FORM_POST,
  ADDRESS_CHANGE_FORM_POST,
  BILLING_REQUEST_FORM_POST,
  PINK_SLIP_FETCH,
  DOWNLOAD_PINK_SLIP_FETCH,
  ALL_PINK_SLIPS_FETCH,
  DOWNLOAD_ALL_PINK_SLIPS_FETCH,
  ACCOUNT_PAGE_CLEAR_STATE,
} from './constants';

export function fetchVehMakes(year) {
  return {
    type: VEH_MAKES_FETCH,
    year,
  };
}

export function fetchVehModels(year, make) {
  return {
    type: VEH_MODELS_FETCH,
    year,
    make,
  };
}

export function fetchAddresses(postalCode) {
  return {
    type: ADDRESSES_FETCH,
    postalCode,
  };
}

export function triggerGenMsgFormSubmitSuccess() {
  return {
    type: GEN_MSG_FORM_SUBMIT_SUCCESS,
  };
}

export function postVehAddForm(formValues, resolve, reject) {
  return {
    type: VEH_ADD_FORM_POST,
    formValues,
    resolve,
    reject,
  };
}

export function postVehSubForm(formValues, resolve, reject) {
  return {
    type: VEH_SUB_FORM_POST,
    formValues,
    resolve,
    reject,
  };
}

export function postAddressChangeForm(formValues, resolve, reject) {
  return {
    type: ADDRESS_CHANGE_FORM_POST,
    formValues,
    resolve,
    reject,
  };
}

export function postBillingRequestForm(formValues, resolve, reject) {
  return {
    type: BILLING_REQUEST_FORM_POST,
    formValues,
    resolve,
    reject,
  };
}

export function fetchPinkSlip(policyId, vehId) {
  return {
    type: PINK_SLIP_FETCH,
    policyId,
    vehId,
  };
}

export function fetchAllPinkSlips(policyId) {
  return {
    type: ALL_PINK_SLIPS_FETCH,
    policyId,
  };
}

export function downloadPinkSlip(policyId, vehId) {
  return {
    type: DOWNLOAD_PINK_SLIP_FETCH,
    policyId,
    vehId,
  };
}

export function downloadAllPinkSlips(policyId) {
  return {
    type: DOWNLOAD_ALL_PINK_SLIPS_FETCH,
    policyId,
  };
}

export function clearAccountPageState() {
  return {
    type: ACCOUNT_PAGE_CLEAR_STATE,
  };
}
