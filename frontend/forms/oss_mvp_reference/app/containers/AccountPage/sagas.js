import { take, race, fork } from 'redux-saga/effects';

import {
  callGetAPIAndDispatchActions,
  callPostAPIAndDispatchActions,
  callGetAPIAndDispatchActionsAndOpenURL,
} from './sagaServices';

import {
  JASMINE_VEH_ROOT_URL,
  JASMINE_POSTAL_CODE_ROOT_URL,
  JASMINE_VEH_ADD_FORM_POST_URL,
  JASMINE_VEH_SUB_FORM_POST_URL,
  JASMINE_ADDRESS_CHANGE_FORM_POST_URL,
  JASMINE_BILLING_REQUEST_FORM_POST_URL,
  PINK_SLIP_FETCH,
  PINK_SLIP_FETCHED,
  FETCH_PINK_SLIP_URL,
  ALL_PINK_SLIPS_FETCH,
  ALL_PINK_SLIPS_FETCHED,
  ALL_PINK_SLIPS_FETCH_URL,
  DOWNLOAD_PINK_SLIP_FETCH,
  DOWNLOAD_PINK_SLIP_FETCHED,
  DOWNLOAD_PINK_SLIP_URL,
  DOWNLOAD_ALL_PINK_SLIPS_FETCH,
  DOWNLOAD_ALL_PINK_SLIPS_FETCHED,
  DOWNLOAD_ALL_PINK_SLIPS_URL,
  JASMINE_API_FETCHING,
  VEH_MAKES_FETCH,
  VEH_MAKES_FETCHED,
  VEH_MODELS_FETCH,
  VEH_MODELS_FETCHED,
  ADDRESSES_FETCH,
  ADDRESSES_FETCHED,
  ADDRESSES_CLEAR,
  VEH_ADD_FORM_POST,
  VEH_ADD_FORM_POSTED,
  VEH_SUB_FORM_POST,
  VEH_SUB_FORM_POSTED,
  ADDRESS_CHANGE_FORM_POST,
  ADDRESS_CHANGE_FORM_POSTED,
  GEN_MSG_FORM_SUBMIT_SUCCESS,
  // added for billing requests
  BILLING_REQUEST_FORM_POST,
  BILLING_REQUEST_FORM_POSTED,
} from './constants';

export function* watchJasmineServices() {
  // Something about the initial login triggers many of these sagas
  while (true) { // eslint-disable-line
    const raceWinner = yield race({
      fetchMakesAction: take(VEH_MAKES_FETCH),
      fetchModelsAction: take(VEH_MODELS_FETCH),
      fetchAddressesAction: take(ADDRESSES_FETCH),
      fetchPinkSlip: take(PINK_SLIP_FETCH),
      fetchAllPinkSlips: take(ALL_PINK_SLIPS_FETCH),
      downloadPinkSlip: take(DOWNLOAD_PINK_SLIP_FETCH),
      downloadAllPinkSlips: take(DOWNLOAD_ALL_PINK_SLIPS_FETCH),
      postVehAddForm: take(VEH_ADD_FORM_POST),
      postVehSubForm: take(VEH_SUB_FORM_POST),
      postAddressChangeForm: take(ADDRESS_CHANGE_FORM_POST),
      postBillingRequestForm: take(BILLING_REQUEST_FORM_POST),
    });
    const key = Object.keys(raceWinner)[0];

    switch (key) {
      case 'fetchMakesAction': {
        const year = raceWinner.fetchMakesAction.year.toString() || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_VEH_ROOT_URL}/${year}/make/`,
          apiResActionType: VEH_MAKES_FETCHED,
          apiResActionPayloadKey: 'vehMakes',
        };
        yield* callGetAPIAndDispatchActions(config);
        break;
      }
      case 'fetchModelsAction': {
        const year = raceWinner.fetchModelsAction.year.toString() || '';
        const make = raceWinner.fetchModelsAction.make.toString() || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_VEH_ROOT_URL}/${year}/make/${make}/model/`,
          apiResActionType: VEH_MODELS_FETCHED,
          apiResActionPayloadKey: 'vehModels',
        };
        yield* callGetAPIAndDispatchActions(config);
        break;
      }
      case 'fetchAddressesAction': {
        const postalCode = raceWinner.fetchAddressesAction.postalCode || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_POSTAL_CODE_ROOT_URL}/`,
          apiPostData: { postal_code: postalCode },
          apiResActionType: ADDRESSES_FETCHED,
          apiResActionPayloadKey: 'addresses',
          apiResCallbackActionType: ADDRESSES_CLEAR,
          apiResCallbackActionPayload: '',
        };
        yield* callPostAPIAndDispatchActions(config);
        break;
      }
      case 'fetchPinkSlip': {
        const policyId = raceWinner.fetchPinkSlip.policyId || '';
        const vehId = raceWinner.fetchPinkSlip.vehId || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${FETCH_PINK_SLIP_URL(policyId, vehId)}/`, // eslint-disable-line
          apiResActionType: PINK_SLIP_FETCHED,
          apiResActionPayloadKey: 'pinkSlip',
        };
        yield* callGetAPIAndDispatchActions(config);
        break;
      }
      case 'fetchAllPinkSlips': {
        const policyId = raceWinner.fetchAllPinkSlips.policyId || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${ALL_PINK_SLIPS_FETCH_URL(policyId)}/`, // eslint-disable-line
          apiResActionType: ALL_PINK_SLIPS_FETCHED,
          apiResActionPayloadKey: 'allPinkSlips',
        };
        yield* callGetAPIAndDispatchActions(config);
        break;
      }
      case 'downloadPinkSlip': {
        const policyId = raceWinner.downloadPinkSlip.policyId || '';
        const vehId = raceWinner.downloadPinkSlip.vehId || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${DOWNLOAD_PINK_SLIP_URL(policyId, vehId)}/`, // eslint-disable-line
          apiResActionType: DOWNLOAD_PINK_SLIP_FETCHED,
          apiResActionPayloadKey: 'downloadPinkSlip',
        };
        yield* callGetAPIAndDispatchActionsAndOpenURL(config, (res) =>
          res.content.url
        );
        break;
      }
      case 'downloadAllPinkSlips': {
        const policyId = raceWinner.downloadAllPinkSlips.policyId || '';
        const config = {
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${DOWNLOAD_ALL_PINK_SLIPS_URL(policyId)}/`, // eslint-disable-line
          apiResActionType: DOWNLOAD_ALL_PINK_SLIPS_FETCHED,
          apiResActionPayloadKey: 'downloadAllPinkSlips',
        };
        yield* callGetAPIAndDispatchActionsAndOpenURL(config, (res) =>
          res.content.url
        );
        break;
      }
      case 'postVehAddForm': {
        const formValues = raceWinner.postVehAddForm.formValues;
        const resolve = raceWinner.postVehAddForm.resolve;
        const reject = raceWinner.postVehAddForm.reject;
        const config = {
          reject,
          resolve: {
            resolve,
            urlToForwardTo: '/account/vehicles/success',
            forwardDelay: 25,
            actionToDispatch: {
              type: GEN_MSG_FORM_SUBMIT_SUCCESS,
            },
          },
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_VEH_ADD_FORM_POST_URL(formValues.policy_id)}/`, // eslint-disable-line
          apiPostData: { ...formValues },
          apiResActionType: VEH_ADD_FORM_POSTED,
          apiResActionPayloadKey: 'response',
        };
        yield* callPostAPIAndDispatchActions(config);
        break;
      }
      case 'postVehSubForm': {
        const formValues = raceWinner.postVehSubForm.formValues;
        const resolve = raceWinner.postVehSubForm.resolve;
        const reject = raceWinner.postVehSubForm.reject;
        const config = {
          reject,
          resolve: {
            resolve,
            urlToForwardTo: '/account/vehicles/success',
            forwardDelay: 25,
            actionToDispatch: {
              type: GEN_MSG_FORM_SUBMIT_SUCCESS,
            },
          },
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_VEH_SUB_FORM_POST_URL(formValues.policy_id)}/`, // eslint-disable-line
          apiPostData: { ...formValues },
          apiResActionType: VEH_SUB_FORM_POSTED,
          apiResActionPayloadKey: 'response',
        };
        yield* callPostAPIAndDispatchActions(config);
        break;
      }
      case 'postAddressChangeForm': {
        const formValues = raceWinner.postAddressChangeForm.formValues;
        const resolve = raceWinner.postAddressChangeForm.resolve;
        const reject = raceWinner.postAddressChangeForm.reject;
        const config = {
          reject,
          resolve: {
            resolve,
            urlToForwardTo: '/account/vehicles/success',
            forwardDelay: 25,
            actionToDispatch: {
              type: GEN_MSG_FORM_SUBMIT_SUCCESS,
            },
          },
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_ADDRESS_CHANGE_FORM_POST_URL(formValues.policy_id)}/`, // eslint-disable-line
          apiPostData: { ...formValues },
          apiResActionType: ADDRESS_CHANGE_FORM_POSTED,
          apiResActionPayloadKey: 'response',
        };
        yield* callPostAPIAndDispatchActions(config);
        break;
      }
      case 'postBillingRequestForm': {
        const formValues = raceWinner.postBillingRequestForm.formValues;
        const resolve = raceWinner.postBillingRequestForm.resolve;
        const reject = raceWinner.postBillingRequestForm.reject;
        const config = {
          reject,
          resolve: {
            resolve,
            urlToForwardTo: '/account/vehicles/success',
            forwardDelay: 25,
            actionToDispatch: {
              type: GEN_MSG_FORM_SUBMIT_SUCCESS,
            },
          },
          fetchingType: JASMINE_API_FETCHING,
          apiURL: `${JASMINE_BILLING_REQUEST_FORM_POST_URL(formValues.policy_id)}/`, // eslint-disable-line
          apiPostData: { ...formValues },
          apiResActionType: BILLING_REQUEST_FORM_POSTED,
          apiResActionPayloadKey: 'response',
        };
        yield* callPostAPIAndDispatchActions(config);
        break;
      }
      default:
        break;
    }
  }
}

export default function* rootWatchJasmineSaga() {
  yield fork(watchJasmineServices);
}

// export default [
//   watchJasmineServices,
// ];
