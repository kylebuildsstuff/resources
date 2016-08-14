import axios from 'axios';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import { TODO_CREATING, TODO_CREATED } from './constants';

export function* createTodo() {
  const ROOT_URL = `http://localhost:3001`;
  const postData = {
    title: 'Woohoo',
    author: 'kyle',
  };

  try {
    let data = yield call(axios.post, `${ROOT_URL}/todos`, postData);
    yield put({type: TODO_CREATED, payload: data});
  } catch (error) {
    yield put({type: CREATE_FAILED, error});
  }
}

// Individual exports for testing
export function* watchCreatingTodo() {
  yield* takeEvery(TODO_CREATING, createTodo);
}

// All sagas to be loaded
export default [
  watchCreatingTodo,
];
