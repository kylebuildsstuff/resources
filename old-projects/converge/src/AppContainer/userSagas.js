import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import api from '../services/api';
import constants from './constants';

export function* createUserSaga(action: Object) {
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
      yield put({
        type: constants.USER_CREATED,
        data: response.data,
      });
    }
  }
}

export function* fetchUserSaga(action: Object) {
  if (action && action.token && action.userId) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.USERS_URL}${action.userId}/`,
        action.token
      );
    } catch (error) {
      console.error('GET /users/:userId/ error: ', error);
    }
    if (response && response.data) {
      yield put({
        type: constants.USER_FETCHED,
        user: response.data,
      });
    }
  }
}

export function* editUserSaga(action: Object) {
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
      console.error('PATCH /users/:userId/ error: ', error);
    }
    if (response && response.data) {
      yield put({
        type: constants.USER_EDITED,
        user: response.data,
      });
    }
  }
}

export function* watchCreateUserSaga() {
  yield takeEvery(constants.USER_CREATE_REQUEST, createUserSaga)
}

export function* watchFetchUserSaga() {
  yield takeEvery(constants.USER_FETCH_REQUEST, fetchUserSaga);
}

export function* watchEditUserSaga() {
  yield takeEvery(constants.USER_EDIT_REQUEST, editUserSaga);
}

export function* rootUserSaga() {
  yield [
    watchCreateUserSaga(),
    watchFetchUserSaga(),
    watchEditUserSaga(),
  ];
}

export default rootUserSaga;
