import axios from 'axios';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import {
  TODO_CREATING, TODO_CREATED, TODO_CREATED_FAILED,
  TODOS_FETCHING, TODOS_FETCHED, TODOS_FETCHING_FAILED,
} from './constants';

export function* fetchTodosSaga() {
  const ROOT_URL = `http://localhost:3001`;

  try {
    let data = yield call(axios.get, `${ROOT_URL}/todos`);
    yield put({type: TODOS_FETCHED, payload: data});
  } catch (error) {
    yield put({type: TODOS_FETCHING_FAILED, error});
  }
}

export function* createTodoSaga() {
  const ROOT_URL = `http://localhost:3001`;
  const postData = {
    title: 'Woohoo',
    author: 'kyle',
    number: Math.random(),
  };

  try {
    let data = yield call(axios.post, `${ROOT_URL}/todos`, postData);
    yield put({type:TODOS_FETCHING});
    yield put({type: TODO_CREATED, payload: data});
  } catch (error) {
    yield put({type: TODO_CREATED_FAILED, error});
  }
}

// Watchers
export function* watchFetchingTodosSaga() {
  yield* takeEvery(TODOS_FETCHING, fetchTodosSaga);
}

export function* watchCreatingTodoSaga() {
  yield* takeEvery(TODO_CREATING, createTodoSaga);
}

// All sagas to be loaded
export default [
  watchCreatingTodoSaga,
  watchFetchingTodosSaga,
];
