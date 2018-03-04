import { all, call, put, takeEvery } from 'redux-saga/effects'

import api from 'services/api';
import constants from 'containers/UserPagesContainer/constants';
import {
  broadcastDeckCreated,
  broadcastDecksFetched,
  broadcastDeckEdited,
  broadcastDeckDeleted,
} from 'containers/UserPagesContainer/actions/deckActions';

export function* createDeckSaga(action) {
  // POST to decks and dispatch action DECK_CREATED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.postWithToken,
        `${constants.GOALS_URL}decks/`,
        {},
        action.token
      );
    } catch (error) {
      console.error(`POST /goals/decks/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastDeckCreated(response.data));
    }
  }
}

export function* fetchDecksSaga(action) {
  // GET decks and dispatch DECKS_FETCHED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.GOALS_URL}decks/`,
        action.token
      )
    } catch (error) {
      console.error(`GET /goals/decks/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastDecksFetched(response.data));
    }
  }
}

export function* editDeckSaga(action) {
  // PATCH deck and dispatch DECK_EDITED with response
  if (action && action.deckId && action.formSubmitData && action.token) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.GOALS_URL}decks/${action.deckId}/`,
        action.formSubmitData,
        action.token
      );
    } catch (error) {
      console.error(`PATCH /goals/decks/${action.deckId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastDeckEdited(action.deckId, response.data));
    }
  }
}

export function* deleteDeckSaga(action) {
  // DELETE deck and dispatch DECK_DELETED with deckId
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.GOALS_URL}decks/${action.deckId}/`,
        action.token
      );
    } catch (error) {
      console.error(`DELETE /goals/decks/${action.deckId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastDeckDeleted(action.deckId));
    }
  }
}

export function* watchCreateDeckSaga() { yield takeEvery(constants.DECK_CREATE_REQUEST, createDeckSaga) }
export function* watchFetchDecksSaga() { yield takeEvery(constants.DECKS_FETCH_REQUEST, fetchDecksSaga) }
export function* watchEditDeckSaga() { yield takeEvery(constants.DECK_EDIT_REQUEST, editDeckSaga) }
export function* watchDeleteDeckSaga() { yield takeEvery(constants.DECK_DELETE_REQUEST, deleteDeckSaga) }

export function* rootDeckSaga() {
  yield all([
    call(watchCreateDeckSaga),
    call(watchFetchDecksSaga),
    call(watchEditDeckSaga),
    call(watchDeleteDeckSaga),
  ]);
}

export default rootDeckSaga;
