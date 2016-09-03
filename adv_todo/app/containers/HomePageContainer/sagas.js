import axios from 'axios';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  TODO_CREATING, TODO_CREATED, TODO_CREATED_FAILED,
  TODOS_FETCHING, TODOS_FETCHED, TODOS_FETCHING_FAILED,
  TODO_UPDATING, TODO_UPDATED, TODO_UPDATING_FAILED,
  TODO_DELETING, TODO_DELETED, TODO_DELETING_FAILED,
} from './constants';

const ROOT_URL = 'http://localhost:3001';

export function* createTodoSaga() {
  console.log('%c -- createTodoSaga Saga  --', 'color: green');
  const postData = {
    title: 'Woohoo',
    author: 'kyle',
    number: Math.random(),
  };

  try {
    const data = yield call(axios.post, `${ROOT_URL}/todos`, postData);
    yield put({ type: TODOS_FETCHING });
    yield put({ type: TODO_CREATED, payload: data });
  } catch (error) {
    yield put({ type: TODO_CREATED_FAILED, error });
  }
}

export function* fetchTodosSaga() {
  console.log('%c -- fetchTodos Saga  --', 'color: green');
  try {
    const data = yield call(axios.get, `${ROOT_URL}/todos`);
    yield put({ type: TODOS_FETCHED, payload: data });
  } catch (error) {
    yield put({ type: TODOS_FETCHING_FAILED, error });
  }
}

export function* updateTodoSaga({ payload }) {
  console.log('%c -- updateTodo Saga  --', 'color: green');
  // console.log('');
  // console.log(payload);
  // console.log('');
  try {
    const resp = yield call(axios.put, `${ROOT_URL}/todos/${payload.get('id')}`, payload);
    yield put({ type: TODO_UPDATED, payload: resp });
    yield put({ type: TODOS_FETCHING });
  } catch (error) {
    yield put({ type: TODO_UPDATING_FAILED, error });
  }
}

export function* deleteTodoSaga({ payload }) {
  console.log('%c -- deleteTodo Saga  --', 'color: green');
  try {
    const data = yield call(axios.delete, `${ROOT_URL}/todos/${payload}`);
    yield put({ type: TODOS_FETCHING });
    yield put({ type: TODO_DELETED, payload: data });
  } catch (error) {
    yield put({ type: TODO_DELETING_FAILED, error });
  }
}

// Watchers
export function* watchCreatingTodoSaga() {
  console.log('%c -- watchCreatingTodo Saga  --', 'color: green');
  yield* takeEvery(TODO_CREATING, createTodoSaga);
}

export function* watchFetchingTodosSaga() {
  console.log('%c -- watchFetchingTodosSaga Saga  --', 'color: green');
  yield* takeEvery(TODOS_FETCHING, fetchTodosSaga);
}

export function* watchUpdatingTodoSaga(data) {
  console.log('%c -- watchUpdatingTodoSaga Saga  --', 'color: green');
  yield* takeEvery(TODO_UPDATING, updateTodoSaga, ...data);
}

export function* watchDeletingTodoSaga(action) {
  console.log('%c -- watchDeletingTodoSaga Saga  --', 'color: green');
  yield takeEvery(TODO_DELETING, deleteTodoSaga, ...action);
}

// All sagas to be loaded
export default [
  watchCreatingTodoSaga,
  watchFetchingTodosSaga,
  watchUpdatingTodoSaga,
  watchDeletingTodoSaga,
];
