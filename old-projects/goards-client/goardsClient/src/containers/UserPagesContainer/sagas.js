import { call, all } from 'redux-saga/effects'

import rootGoalSaga from './sagas/goalSagas';
import rootUserSaga from './sagas/userSagas';

export function* userPagesSagas() {
  yield all([
    call(rootUserSaga),
    call(rootGoalSaga),
  ]);
}

export default userPagesSagas;
