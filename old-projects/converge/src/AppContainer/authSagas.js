import jwtDecode from 'jwt-decode';
import {
  put,
  call,
  take,
  takeEvery,
} from 'redux-saga/effects';

import api from '../services/api';
import constants from './constants';
import {
  clearReduxState,
  login,
  createUser,
  fetchUser,
  switchAuthenticatedFlag,
  switchAuthenticatingFlag,
} from './actions';

export function* signupSaga(action: Object) {
  yield put(createUser(action.formSubmitData));
  const userCreatedAction = yield take(constants.USER_CREATED);
  // response will not return passwords for security reasons, so reuse the one submitted in signup form
  const loginData: Object = Object.assign(
    {},
    userCreatedAction.data,
    action.formSubmitData
  )
  yield put(login(loginData));
}

export function* loginSaga(action: Object) {
  yield put(switchAuthenticatingFlag(true));
  let response;
  try {
    response = yield call(api.post, constants.TOKEN_OBTAIN_URL, action.formSubmitData);
  } catch (error) {
    console.error('POST /token/ login error: ', error);
  }
  if (response) {
    localStorage.setItem('jwt', response.data.token);
    const decodedToken = yield call(jwtDecode, response.data.token);
    yield put(fetchUser(decodedToken.user_id, response.data.token));
    yield put(switchAuthenticatedFlag(true));
  }
  yield put(switchAuthenticatingFlag(false));
}

export function* logoutSaga(action: Object) {
  localStorage.removeItem('jwt');
  yield put(clearReduxState());
}

export function* verifyTokenSaga(action: Object) {
  let response;
  try {
    response = yield call(api.post, constants.TOKEN_VERIFY_URL, { 'token': action.token });
  } catch (error) {
    console.error('verify token error: ', error);
  }
  if (response && response.status === 200) {
    yield put(switchAuthenticatedFlag(true));
  } else {
    yield put(switchAuthenticatedFlag(false));
  }
  if (action.callback) {
    action.callback();
  }
}

function* watchSignupSaga() {
  yield takeEvery(constants.SIGNUP_REQUEST, signupSaga);
}

function* watchLoginSaga() {
  yield takeEvery(constants.LOGIN_REQUEST, loginSaga);
}

function* watchLogoutSaga() {
  yield takeEvery(constants.LOGOUT_REQUEST, logoutSaga);
}

function* watchVerifyTokenSaga() {
  yield takeEvery(constants.VERIFY_TOKEN, verifyTokenSaga);
}

export function* rootAuthSaga() {
  yield [
    watchSignupSaga(),
    watchLoginSaga(),
    watchLogoutSaga(),
    watchVerifyTokenSaga(),
  ];
}

export default rootAuthSaga;
