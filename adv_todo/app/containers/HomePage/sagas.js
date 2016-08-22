import axios from 'axios';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import {
  TODO_CREATING, TODO_CREATED, TODO_CREATED_FAILED,
  TODOS_FETCHING, TODOS_FETCHED, TODOS_FETCHING_FAILED,
  TODO_DELETING, TODO_DELETED, TODO_DELETING_FAILED
} from './constants';

const ROOT_URL = `http://localhost:3001`;

export function* createTodoSaga() {
  const postData = {
    title: 'Woohoo',
    author: 'kyle',
    number: Math.random(),
  };

  try {
    let data = yield call(axios.post, `${ROOT_URL}/todos`, postData);
    yield put({type: TODOS_FETCHING});
    yield put({type: TODO_CREATED, payload: data});
  } catch (error) {
    yield put({type: TODO_CREATED_FAILED, error});
  }
}

export function* fetchTodosSaga() {
  try {
    let data = yield call(axios.get, `${ROOT_URL}/todos`);
    yield put({type: TODOS_FETCHED, payload: data});
  } catch (error) {
    yield put({type: TODOS_FETCHING_FAILED, error});
  }
}

export function* deleteTodoSaga(action) {
  try {
    let data = yield call(axios.delete, `${ROOT_URL}/todos/${action.payload}`)
    yield put({type: TODOS_FETCHING})
    yield put({type: TODO_DELETED, payload: data})
  } catch (error) {
    yield put({type: TODO_DELETING_FAILED, error})
  }
}

// Watchers
export function* watchCreatingTodoSaga() {
  yield* takeEvery(TODO_CREATING, createTodoSaga);
}

export function* watchFetchingTodosSaga() {
  yield* takeEvery(TODOS_FETCHING, fetchTodosSaga);
}

export function* watchDeletingTodoSaga(action) {
  yield takeEvery(TODO_DELETING, deleteTodoSaga, ...action);
}

// All sagas to be loaded
export default [
  watchCreatingTodoSaga,
  watchFetchingTodosSaga,
  watchDeletingTodoSaga
];
