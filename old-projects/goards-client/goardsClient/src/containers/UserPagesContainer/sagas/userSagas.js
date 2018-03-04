import _ from 'lodash';
import {
  all,
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

import { logout } from 'containers/AppContainer/actions';
import api from 'services/api';
import constants from 'containers/UserPagesContainer/constants';
import {
  broadcastUserCreated,
  broadcastUserFetched,
  broadcastUserEdited,
  broadcastUserDeleted,
} from 'containers/UserPagesContainer/actions/userActions';

export function* createUserSaga(action) {
  // Create user and dispatch action containing created user
  // Consumed by registerSaga
  if (action && action.formSubmitData) {
    let response;
    try {
      response = yield call(
        api.post,
        `${constants.USERS_URL}`,
        action.formSubmitData
      );
    } catch (error) {
      console.error('POST /users/ error: ', error);
    }
    if (response && response.data) {
      yield put(broadcastUserCreated(response.data));
    }
  }
}

export function* fetchUserSaga(action) {
  // GET user and dispatch action with fetched user
  if (action && action.token && action.userId) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.USERS_URL}${action.userId}/`,
        action.token
      );
    } catch (error) {
      console.error(`GET /users/${action.userId}/ error: ${error}`);
    }
    if (response && response.data) {
      yield put(broadcastUserFetched(response.data));
    }
  }
}

export function* editUserSaga(action) {
  // PATCH user and dispatch action with edited user
  if (action && action.token && action.userId && !_.isEmpty(action.formSubmitData)) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.USERS_URL}${action.userId}/`,
        action.formSubmitData,
        action.token
      );
    } catch (error) {
      console.error(`PATCH /users/${action.userId}/ error: ${error}`);
    }
    if (response && response.data) {
      yield put(broadcastUserEdited(response.data));
    }
  }
}

export function* deleteUserSaga(action) {
  // DELETE user and logout if successful
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.USERS_URL}${action.userId}/`,
        action.token
      )
    } catch (error) {
      console.error(`DELETE /users/${action.userId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastUserDeleted(action.userId));
      yield put(logout());
    }
  }
}

export function* watchCreateUserSaga() { yield takeEvery(constants.USER_CREATE_REQUEST, createUserSaga) }
export function* watchFetchUserSaga() { yield takeEvery(constants.USER_FETCH_REQUEST, fetchUserSaga) }
export function* watchEditUserSaga() { yield takeEvery(constants.USER_EDIT_REQUEST, editUserSaga) }
export function* watchDeleteUserSaga() { yield takeEvery(constants.USER_DELETED_REQUEST, deleteUserSaga) }

export function* rootUserSaga() {
  yield all([
    call(watchCreateUserSaga),
    call(watchFetchUserSaga),
    call(watchEditUserSaga),
    call(watchDeleteUserSaga),
  ]);
}

export default rootUserSaga;
