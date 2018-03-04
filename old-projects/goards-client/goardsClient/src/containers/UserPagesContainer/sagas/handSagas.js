import { all, call, put, takeEvery } from 'redux-saga/effects'

import api from 'services/api';
import constants from 'containers/UserPagesContainer/constants';

import {
  broadcastHandCreated,
  broadcastHandsFetched,
  broadcastHandEdited,
  broadcastHandDeleted,
} from 'containers/UserPagesContainer/actions/handActions';

export function* createHandSaga(action) {
  // POST to hands and dispatch action HAND_CREATED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.postWithToken,
        `${constants.GOALS_URL}hands/`,
        {},
        action.token
      );
    } catch (error) {
      console.error(`POST /goals/hands/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastHandCreated(response.hand));
    }
  }
}

export function* fetchHandsSaga(action) {
  // GET hands and dispatch HANDS_FETCHED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.GOALS_URL}hands/`,
        action.token
      )
    } catch (error) {
      console.error(`GET /goals/hands/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastHandsFetched(response.data));
    }
  }
}

export function* editHandSaga(action) {
  // PATCH deck and dispatch HAND_EDITED with response
  if (action && action.handId && action.formSubmitData && action.token) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.GOALS_URL}hands/${action.handId}/`,
        action.formSubmitData,
        action.token
      );
    } catch (error) {
      console.error(`PATCH /goals/hands/${action.handId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastHandEdited(action.handId, response.data));
    }
  }
}

export function* deleteHandSaga(action) {
  // DELETE hand and dispatch HAND_DELETED with handId
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.GOALS_URL}hands/${action.handId}/`,
        action.token
      );
    } catch (error) {
      console.error(`DELETE /goals/hands/${action.handId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastHandDeleted(action.handId));
    }
  }
}

export function* watchCreateHandSaga() { yield takeEvery(constants.HAND_CREATE_REQUEST, createHandSaga) }
export function* watchFetchHandsSaga() { yield takeEvery(constants.HANDS_FETCH_REQUEST, fetchHandsSaga) }
export function* watchEditHandSaga() { yield takeEvery(constants.HAND_EDIT_REQUEST, editHandSaga) }
export function* watchDeleteHandSaga() { yield takeEvery(constants.HAND_DELETE_REQUEST, deleteHandSaga) }

export function* rootHandSaga() {
  yield all([
    call(watchCreateHandSaga),
    call(watchFetchHandsSaga),
    call(watchEditHandSaga),
    call(watchDeleteHandSaga),
  ]);
}

export default rootHandSaga;
