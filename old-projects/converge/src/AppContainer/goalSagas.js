import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../services/api';
import constants from './constants';

export function* createGoalSaga(action: Object) {
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.postWithToken,
        constants.GOALS_URL,
        {},
        action.token
      )
    } catch (error) {
      console.error('POST /goals/ error: ', error);
    }
    if (response) {
      yield put({
        type: constants.GOAL_CREATED,
        data: response.data,
      })
    }
  }
}

export function* fetchGoalsSaga(action: Object) {
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.getWithToken,
        constants.GOALS_URL,
        action.token
      )
    } catch (error) {
      console.error('GET /goals/ error: ', error);
    }
    if (response) {
      yield put({
        type: constants.GOALS_FETCHED,
        goals: response.data,
      });
    }
  }
}

export function* editGoalSaga(action: Object) {
  if (action && action.goalId && action.formSubmitData && action.token) {
    let response;
    try {
      response = yield call(
        api.patchWithToken,
        `${constants.GOALS_URL}${action.goalId}/`,
        action.formSubmitData,
        action.token
      )
    } catch (error) {
      console.error('PATCH /goals/:goalId/ error: ', error);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put({
        type: constants.GOAL_EDITED,
        goalId: action.goalId,
        data: response.data
      })
    }
  }
}

export function* deleteGoalSaga(action: Object) {
  if (action && action.token) {
    let response;
    try {
      response = yield call(
        api.deleteWithToken,
        `${constants.GOALS_URL}${action.goalId}/`,
        action.token
      )
    } catch (error) {
      console.error('DELETE /goals/:goalId/ error: ', error);
    }
    if (response && parseInt(response.status, 10) >= 200 && parseInt(response.status, 10) <= 300) {
      yield put({
        type: constants.GOAL_DELETED,
        goalId: action.goalId,
      });
    }
  }
}

export function* watchCreateGoalSaga() {
  yield takeEvery(constants.GOAL_CREATE_REQUEST, createGoalSaga);
}

export function* watchFetchGoalsSaga() {
  yield takeEvery(constants.GOALS_FETCH_REQUEST, fetchGoalsSaga);
}

export function* watchEditGoalSaga() {
  yield takeEvery(constants.GOAL_EDIT_REQUEST, editGoalSaga);
}

export function* watchDeleteGoalSaga() {
  yield takeEvery(constants.GOAL_DELETE_REQUEST, deleteGoalSaga);
}

export function* rootGoalSaga() {
  yield [
    watchCreateGoalSaga(),
    watchFetchGoalsSaga(),
    watchEditGoalSaga(),
    watchDeleteGoalSaga(),
  ];
}

export default rootGoalSaga;
