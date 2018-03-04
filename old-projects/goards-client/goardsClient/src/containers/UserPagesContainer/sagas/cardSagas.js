import { all, call, put, takeEvery } from 'redux-saga/effects'

import api from 'services/api';
import constants from 'containers/UserPagesContainer/constants';
import {
  broadcastCardCreated,
  broadcastCardsFetched,
  broadcastCardEdited,
  broadcastCardDeleted,
} from 'containers/UserPagesContainer/actions/cardActions';

export function* createCardSaga(action) {
  // POST to cards and dispatch action CARD_CREATED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.postWithToken,
        `${constants.GOALS_URL}cards/`,
        {},
        action.token
      );
    } catch (error) {
      console.error(`POST /goals/cards/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastCardCreated(response.data));
    }
  }
}

export function* fetchCardsSaga(action) {
  // GET cards and dispatch CARDS_FETCHED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.GOALS_URL}cards/`,
        action.token
      )
    } catch (error) {
      console.error(`GET /goals/cards/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastCardsFetched(response.data));
    }
  }
}

export function* editCardSaga(action) {
  // PATCH deck and dispatch CARD_EDITED with response
  if (action && action.cardId && action.formSubmitData && action.token) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.GOALS_URL}cards/${action.cardId}/`,
        action.formSubmitData,
        action.token
      );
    } catch (error) {
      console.error(`PATCH /goals/cards/${action.cardId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastCardEdited(action.cardId, response.data));
    }
  }
}

export function* deleteCardSaga(action) {
  // DELETE card and dispatch CARD_DELETED with cardId
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.GOALS_URL}cards/${action.cardId}/`,
        action.token
      );
    } catch (error) {
      console.error(`DELETE /goals/cards/${action.cardId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastCardDeleted(action.cardId));
    }
  }
}

export function* watchCreateCardSaga() { yield takeEvery(constants.CARD_CREATE_REQUEST, createCardSaga) }
export function* watchFetchCardsSaga() { yield takeEvery(constants.CARDS_FETCH_REQUEST, fetchCardsSaga) }
export function* watchEditCardSaga() { yield takeEvery(constants.CARD_EDIT_REQUEST, editCardSaga) }
export function* watchDeleteCardSaga() { yield takeEvery(constants.CARD_DELETE_REQUEST, deleteCardSaga) }

export function* rootCardSaga() {
  yield all([
    call(watchCreateCardSaga),
    call(watchFetchCardsSaga),
    call(watchEditCardSaga),
    call(watchDeleteCardSaga),
  ]);
}

export default rootCardSaga;
