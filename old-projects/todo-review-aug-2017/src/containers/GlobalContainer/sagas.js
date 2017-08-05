import { call, all, takeEvery } from 'redux-saga/effects';

function* whatwhatSaga() {
  yield
}

function* testSaga() {
  yield takeEvery('whaaat', whatwhatSaga);
}

export function* globalSagas() {
  yield all([
    call(testSaga)
  ])
}

export default globalSagas;
