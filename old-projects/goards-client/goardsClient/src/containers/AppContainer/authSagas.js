import jwtDecode from 'jwt-decode';
import {
  all,
  put,
  call,
  take,
  takeEvery,
} from 'redux-saga/effects';

import api from 'services/api';
import appConstants from 'containers/AppContainer/constants';
import userPagesConstants from 'containers/UserPagesContainer/constants';
import {
  switchAuthenticatedFlag,
  switchAuthenticatingFlag,
  clearReduxState,
  login,
} from 'containers/AppContainer/actions';
import {
  createUser,
  fetchUser,
} from 'containers/UserPagesContainer/actions/userActions';

export function* registerSaga(action) {
  // Create user, then dispatch login request with said user.
  yield put(createUser(action.formSubmitData));
  const userCreatedAction = yield take(userPagesConstants.USER_CREATED)
  // response will not return passwords for security reasons, so reuse the one submitted in register form to create login data
  const loginData = Object.assign(
    {},
    userCreatedAction.userData,
    action.formSubmitData
  );
  yield put(login(loginData));
}

export function* loginSaga(action) {
  // Obtain token, switch Authenticated/ing flags based on response
  yield put(switchAuthenticatingFlag(true));
  let response;
  try {
    response = yield call(api.post, appConstants.TOKEN_OBTAIN_URL, action.formSubmitData);
  } catch (error) {
    console.error('POST /token/ login error: ', error);
  }
  if (response) {
    localStorage.setItem('jwt', response.data.token);
    // decodedToken will NOT contain password because API does not return passwords, for security reasons
    const decodedToken = yield call(jwtDecode, response.data.token);
    yield put(fetchUser(decodedToken.user_id, response.data.token));
    yield put(switchAuthenticatedFlag(true));
  }
  yield put(switchAuthenticatingFlag(false));
}

export function* logoutSaga(action) {
  // remove token and clear redux state
  localStorage.removeItem('jwt');
  yield put(clearReduxState());
}

export function* verifyTokenSaga(action) {
  let response;
  try {
    response = yield call(api.post, appConstants.TOKEN_VERIFY_URL, { 'token': action.token });
  } catch (error) {
    console.error('verify token error: ', error);
  }
  if (response && response.status === 200) {
    yield put(switchAuthenticatedFlag(true));
  }
  // Callback is for setting localState to indicate API call completed (regardless of success)
  // Async data flow handled purely by generators and actions are plain objects, therefore needed to pass
    // a cb in the action that can then be used in this generator.
  if (action.callback) {
    action.callback();
  }
}

function* watchRegisterSaga() {
  yield takeEvery(appConstants.REGISTER_REQUEST, registerSaga);
}

function* watchLoginSaga() {
  yield takeEvery(appConstants.LOGIN_REQUEST, loginSaga);
}

function* watchLogoutSaga() {
  yield takeEvery(appConstants.LOGOUT_REQUEST, logoutSaga);
}

function* watchVerifyTokenSaga() {
  yield takeEvery(appConstants.VERIFY_TOKEN, verifyTokenSaga);
}

export function* rootAuthSaga() {
  yield all([
    call(watchRegisterSaga),
    call(watchLoginSaga),
    call(watchLogoutSaga),
    call(watchVerifyTokenSaga),
  ]);
}

export default rootAuthSaga;
