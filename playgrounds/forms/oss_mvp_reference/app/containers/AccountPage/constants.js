/*
 *
 * AccountPage constants
 *
 */

 // https://local-smartcov.oss.csgwebapps.com/api/external/vicc/year/
 // https://local-smartcov.oss.csgwebapps.com/api/external/vicc/year/2016/make/
 // https://local-smartcov.oss.csgwebapps.com/api/external/vicc/year/2017/make/acura/model/
 // https://local-smartcov.oss.csgwebapps.com/api/external/vicc/year/2017/make/acura/model/

export const JASMINE_VEH_ROOT_URL = '/api/external/vicc/year';
export const JASMINE_POSTAL_CODE_ROOT_URL =
'/api/external/postal_code/addresses';
export const JASMINE_VEH_ADD_FORM_POST_URL = (policyId) => (
  `/api/policy/service_requests/${policyId}/vehicle_add`
);
export const JASMINE_VEH_SUB_FORM_POST_URL = (policyId) => (
  `/api/policy/service_requests/${policyId}/vehicle_sub`
);
export const JASMINE_ADDRESS_CHANGE_FORM_POST_URL = (policyId) => (
  `/api/policy/service_requests/${policyId}/address_change`
);
export const JASMINE_BILLING_REQUEST_FORM_POST_URL = (policyId) => (
  `/api/policy/service_requests/${policyId}/billing_inquiry`
);
export const ALL_PINK_SLIPS_FETCH_URL = (policyId) => (
  `/api/policy/slips/${policyId}/email`
);
export const FETCH_PINK_SLIP_URL = (policyId, vehId) => (
  `/api/policy/slips/${policyId}/vehicle/${vehId}/email`
);
export const DOWNLOAD_ALL_PINK_SLIPS_URL = (policyId) => (
  `/api/policy/slips/${policyId}`
);
export const DOWNLOAD_PINK_SLIP_URL = (policyId, vehId) => (
  `/api/policy/slips/${policyId}/vehicle/${vehId}`
);

export const ACCOUNT_PAGE_CLEAR_STATE = 'app/AccountPage/ACCOUNT_PAGE_CLEAR_STATE';

export const VEH_MAKES_FETCH = 'app/AccountPage/VEH_MAKES_FETCH';
export const VEH_MAKES_FETCHED = 'app/AccountPage/VEH_MAKES_FETCHED';

export const VEH_MODELS_FETCH = 'app/AccountPage/VEH_MODELS_FETCH';
export const VEH_MODELS_FETCHED = 'app/AccountPage/VEH_MODELS_FETCHED';

export const ADDRESSES_FETCH = 'app/AccountPage/ADDRESSES_FETCH';
export const ADDRESSES_FETCHED = 'app/AccountPage/ADDRESSES_FETCHED';
export const ADDRESSES_CLEAR = 'app/AccountPage/ADDRESSES_CLEAR';

export const JASMINE_API_FETCHING = 'app/AccountPage/JASMINE_API_FETCHING';
export const JASMINE_API_FETCHING_FAILED = 'app/AccountPage/JASMINE_API_FETCHING_FAILED';

export const VEH_ADD_FORM_POST = 'app/AccountPage/VEH_ADD_FORM_POST';
export const VEH_ADD_FORM_POSTED = 'app/AccountPage/VEH_ADD_FORM_POSTED';
export const VEH_ADD_FORM_POSTING = 'app/AccountPage/VEH_ADD_FORM_POSTING';
export const VEH_ADD_FORM_POSTING_FAILED = 'app/AccountPage/VEH_ADD_FORM_POSTING_FAILED';

export const VEH_SUB_FORM_POST = 'app/AccountPage/VEH_SUB_FORM_POST';
export const VEH_SUB_FORM_POSTED = 'app/AccountPage/VEH_SUB_FORM_POSTED';
export const VEH_SUB_FORM_POSTING = 'app/AccountPage/VEH_SUB_FORM_POSTING';
export const VEH_SUB_FORM_POSTING_FAILED = 'app/AccountPage/VEH_SUB_FORM_POSTING_FAILED';

export const ADDRESS_CHANGE_FORM_POST = 'app/AccountPage/ADDRESS_CHANGE_FORM_POST';
export const ADDRESS_CHANGE_FORM_POSTED = 'app/AccountPage/ADDRESS_CHANGE_FORM_POSTED';
export const ADDRESS_CHANGE_FORM_POSTING = 'app/AccountPage/ADDRESS_CHANGE_FORM_POSTING';
export const ADDRESS_CHANGE_FORM_POSTING_FAILED = 'app/AccountPage/ADDRESS_CHANGE_FORM_POSTING_FAILED';

export const BILLING_REQUEST_FORM_POST = 'app/AccountPage/BILLING_REQUEST_FORM_POST';
export const BILLING_REQUEST_FORM_POSTED = 'app/AccountPage/BILLING_REQUEST_FORM_POSTED';
export const BILLING_REQUEST_FORM_POSTING = 'app/AccountPage/BILLING_REQUEST_FORM_POSTING';
export const BILLING_REQUEST_FORM_POSTING_FAILED = 'app/AccountPage/BILLING_REQUEST_FORM_POSTING_FAILED';

export const GEN_MSG_FORM_SUBMIT_SUCCESS = 'app/AccountPage/GEN_MSG_FORM_SUBMIT_SUCCESS';

export const PINK_SLIP_FETCH = 'app/AccountPage/PINK_SLIP_FETCH';
export const PINK_SLIP_FETCHED = 'app/AccountPage/PINK_SLIP_FETCHED';
export const ALL_PINK_SLIPS_FETCH = 'app/AccountPage/ALL_PINK_SLIPS_FETCH';
export const ALL_PINK_SLIPS_FETCHED = 'app/AccountPage/ALL_PINK_SLIPS_FETCHED';

export const DOWNLOAD_PINK_SLIP_FETCH = 'app/AccountPage/DOWNLOAD_PINK_SLIP_FETCH';
export const DOWNLOAD_PINK_SLIP_FETCHED = 'app/AccountPage/DOWNLOAD_PINK_SLIP_FETCHED';
export const DOWNLOAD_ALL_PINK_SLIPS_FETCH = 'app/AccountPage/DOWNLOAD_ALL_PINK_SLIPS_FETCH';
export const DOWNLOAD_ALL_PINK_SLIPS_FETCHED = 'app/AccountPage/DOWNLOAD_ALL_PINK_SLIPS_FETCHED';
