import { all, call, put, takeEvery } from 'redux-saga/effects'

import api from 'services/api';
import constants from 'containers/UserPagesContainer/constants';

import {
  broadcastCommentCreated,
  broadcastCommentsFetched,
  broadcastCommentEdited,
  broadcastCommentDeleted,
} from 'containers/UserPagesContainer/actions/commentActions';

export function* createCommentSaga(action) {
  // POST to comments and dispatch action COMMENT_CREATED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.postWithToken,
        `${constants.GOALS_URL}comments/`,
        {},
        action.token
      );
    } catch (error) {
      console.error(`POST /goals/comments/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastCommentCreated(response.data));
    }
  }
}

export function* fetchCommentsSaga(action) {
  // GET comments and dispatch COMMENTS_FETCHED with response
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        `${constants.GOALS_URL}comments/`,
        action.token
      )
    } catch (error) {
      console.error(`GET /goals/comments/ error: ${error}`);
    }
    if (response) {
      yield put(broadcastCommentsFetched(response.data));
    }
  }
}

export function* editCommentSaga(action) {
  // PATCH comment and dispatch COMMENT_EDITED with response
  if (action && action.commentId && action.formSubmitData && action.token) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.GOALS_URL}comments/${action.commentId}/`,
        action.formSubmitData,
        action.token
      );
    } catch (error) {
      console.error(`PATCH /goals/comments/${action.commentId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastCommentEdited(action.commentId, response.data));
    }
  }
}

export function* deleteCommentSaga(action) {
  // DELETE comment and dispatch COMMENT_DELETED with commentId
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.GOALS_URL}comments/${action.commentId}/`,
        action.token
      );
    } catch (error) {
      console.error(`DELETE /goals/comments/${action.commentId}/ error: ${error}`);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put(broadcastCommentDeleted(action.commentId));
    }
  }
}

export function* watchCreateCommentSaga() { yield takeEvery(constants.COMMENT_CREATE_REQUEST, createCommentSaga) }
export function* watchFetchCommentsSaga() { yield takeEvery(constants.COMMENTS_FETCH_REQUEST, fetchCommentsSaga) }
export function* watchEditCommentSaga() { yield takeEvery(constants.COMMENT_EDIT_REQUEST, editCommentSaga) }
export function* watchDeleteCommentSaga() { yield takeEvery(constants.COMMENT_DELETE_REQUEST, deleteCommentSaga) }

export function* rootCommentSaga() {
  yield all([
    call(watchCreateCommentSaga),
    call(watchFetchCommentsSaga),
    call(watchEditCommentSaga),
    call(watchDeleteCommentSaga),
  ]);
}

export default rootCommentSaga;
