import axios from 'axios';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import { CREATING_TODO, CREATED_TODO } from './constants';

export function* createTodo() {
  const ROOT_URL = `http://localhost:3001`;
  try {
    const postData = {
      title: 'Woohoo',
      author: 'kylsse',
    }
    console.log('actions step 2')
    let data = yield call(axios.post, `${ROOT_URL}/todos`, postData);
    console.log('actions step 3');
    yield put({type: CREATED_TODO, payload: data});
    console.log('actions step 4')
  } catch (error) {
    console.log('actions step nono')
    yield put({type: CREATE_FAILED, error});
  }
}

// Individual exports for testing
export function* watchCreatingTodo() {
  yield* takeEvery(CREATING_TODO, createTodo);
}

// All sagas to be loaded
export default [
  watchCreatingTodo,
];
