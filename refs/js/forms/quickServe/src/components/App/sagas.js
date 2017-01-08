import { delay } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';


function* dummySaga() {
  while (true) {
    yield take('Batman');
  }
}

export default function* root() {
  yield [
    fork(dummySaga)
  ]
}
