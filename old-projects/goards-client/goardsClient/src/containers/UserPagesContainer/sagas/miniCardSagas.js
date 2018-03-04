import { all, call, put, takeEvery } from 'redux-saga/effects'

import api from 'services/api';
import constants from 'containers/UserPagesContainer/constants';

import {
  broadcastMiniCardCreated,
  broadcastMiniCardsFetched,
  broadcastMiniCardEdited,
  broadcastMiniCardDeleted,
} from 'containers/UserPagesContainer/actions/miniCardActions';

export function* createMiniCardSaga(action) {
  // POST to miniCards and dispatch action MINICARD_CREATED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.postWithToken,
        `${constants.GOALS_URL}minicards/`,
        {},
        action.token
      );
    } catch (error) {
      console.error(`POST /goals/minicards/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastMiniCardCreated(response.data));
    }
  }
}

export function* fetchMiniCardsSaga(action) {
  // GET miniCards and dispatch MINICARDS_FETCHED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.GOALS_URL}minicards/`,
        action.token
      )
    } catch (error) {
      console.error(`GET /goals/minicards/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastMiniCardsFetched(response.data));
    }
  }
}

export function* editMiniCardSaga(action) {
  // PATCH miniCard and dispatch MINICARD_EDITED with response
  if (action && action.miniCardId && action.formSubmitData && action.token) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.GOALS_URL}minicards/${action.miniCardId}/`,
        action.formSubmitData,
        action.token
      );
    } catch (error) {
      console.error(`PATCH /goals/minicards/${action.miniCardId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastMiniCardEdited(action.miniCardId, response.data));
    }
  }
}

export function* deleteMiniCardSaga(action) {
  // DELETE miniCard and dispatch MINICARD_DELETED with miniCardId
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.GOALS_URL}minicards/${action.miniCardId}/`,
        action.token
      );
    } catch (error) {
      console.error(`DELETE /goals/minicards/${action.miniCardId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastMiniCardDeleted(action.miniCardId));
    }
  }
}

export function* watchCreateMiniCardSaga() { yield takeEvery(constants.MINICARD_CREATE_REQUEST, createMiniCardSaga) }
export function* watchFetchMiniCardsSaga() { yield takeEvery(constants.MINICARDS_FETCH_REQUEST, fetchMiniCardsSaga) }
export function* watchEditMiniCardSaga() { yield takeEvery(constants.MINICARD_EDIT_REQUEST, editMiniCardSaga) }
export function* watchDeleteMiniCardSaga() { yield takeEvery(constants.MINICARD_DELETE_REQUEST, deleteMiniCardSaga) }

export function* rootMiniCardSaga() {
  yield all([
    call(watchCreateMiniCardSaga),
    call(watchFetchMiniCardsSaga),
    call(watchEditMiniCardSaga),
    call(watchDeleteMiniCardSaga),
  ]);
}

export default rootMiniCardSaga;
