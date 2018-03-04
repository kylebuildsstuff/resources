import { call, all } from 'redux-saga/effects'

import rootAuthSaga from './authSagas';

export function* appSagas() {
  yield all([
    call(rootAuthSaga)
  ]);
}

export default appSagas;
