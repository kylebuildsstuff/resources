import axios from 'axios';
import { take, call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import {
  TODOS_REQUESTING,
  TODOS_REQUESTED,
  TODOS_REQUESTED_FAILED
} from './constants';

// Individual exports for testing
export function* requestTodos() {
  const ROOT_URL = `http://localhost:3001`;
  try {
    let data = yield call(axios.get, `${ROOT_URL}/todos`);
    yield put({type: TODOS_REQUESTED, payload: data});
  } catch (error) {
    yield put({type: TODOS_REQUESTED_FAILED, error});
  }
}

export function* watchRequestingTodos() {
  yield* takeEvery(TODOS_REQUESTING, requestTodos)
}

// All sagas to be loaded
export default [
  watchRequestingTodos,
];
