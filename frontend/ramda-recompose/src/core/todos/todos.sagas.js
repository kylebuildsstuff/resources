import { takeLatest, call, put } from 'redux-saga/effects';

import { TODOS } from './todos.constants';
import { api as apiFactory } from '../../api';
import {
  broadcastTodoCreated,
  broadcastFetchedTodos,
  broadcastUpdatedTodo,
  broadcastDeletedTodo,
} from './todos.actions';

export function* createTodoSaga(action) {
  let apiFunction = apiFactory(TODOS.BASE_API_URL)('post');
  if (action) {
    let response;
    try {
      response = yield call(apiFunction);
    } catch (error) {
      console.error(`POST error ${error}`);
    }
    if (response) {
      yield put(broadcastTodoCreated(response.data));
    }
  }
}

export function* fetchTodosSaga(action) {
  let apiFunction = apiFactory(TODOS.BASE_API_URL)('get');
  if (action) {
    let response;
    try {
      response = yield call(apiFunction);
    } catch (error) {
      console.error(`GET todos error: ${error}`);
    }
    if (response) {
      yield put(broadcastFetchedTodos(response.data))
    }
  }
}

export function* updateTodoSaga(action) {
  if (action && action.todoId && action.data) {
    let apiFunction = apiFactory(`${TODOS.BASE_API_URL}/${action.todoId}`)('patch');
    let response;
    try {
      response = yield call(apiFunction, action.data);
    } catch (error) {
      console.error(`PATCH todos error: ${error}`);
    }
  }
}

export function* deleteTodoSaga(action) {
  if (action && action.todoId) {
    let apiFunction = apiFactory(`${TODOS.BASE_API_URL}/${action.todoId}`)('delete');
    let response;
    try {
      response = yield call(apiFunction);
    } catch (error) {
      console.error(`DELETE todo error: ${error}`);
    }
  }
}

export function* watchForTodoActions() {
  yield takeEvery(TODOS.CREATE, createTodoSaga);
  yield takeEvery(TODOS.FETCH, fetchTodoSaga);
  yield takeEvery(TODOS.UPDATE, updateTodoSaga);
  yield takeEvery(TODOS.DELETE, deleteTodoSaga);
};
