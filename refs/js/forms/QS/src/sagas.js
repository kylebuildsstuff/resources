import { take, call, put, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as types from './constants';
import api from './api.js';

function* authCheck() {
  while (true) {
    // const token = api.getAuthToken();
    // console.log('token: ', token);

    yield delay(120000);
  }
}

function* loginSaga() {
  // console.log('loginSaga running!');
  while (true) {

    const loginRequest = yield take(types.LOGIN_REQUEST);

    console.log('loginRequest received!');

    const response = yield call(api.post, 'https://local-smartcov.oss.csgwebapps.com/api/auth/jwt/token/', loginRequest);

    if (response.status_code === 200) {
      api.setAuthToken(response.content.token);
      yield put({type: types.LOGIN_SUCCESS, authed: true, sending: false});
      console.log('success', response);
    } else {
      yield put({type: types.LOGIN_FAILURE, error: 'Could not login'});
    }

  }
}

function* apiCall() {
  while (true) {

    yield take(types.API_CALL);

    const policies = yield call(api.getNoAuth, 'http://localhost:3001/policies');
    const contact = yield call(api.getNoAuth, 'http://localhost:3001/contact');

    yield put({
      type: types.CONTACT_DATA_SUCCESS,
      contact: contact[0],
      policies,
    });
  }
}

// function* srSaga() {
//   while (1 > 2) {
//
//   }
// }

export default function* root() {
  yield [
    fork(authCheck),
    fork(loginSaga),
    fork(apiCall),
  ]
}
