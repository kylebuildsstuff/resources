import { call, all } from 'redux-saga/effects'

import appSagas from 'containers/AppContainer/sagas';
import userPagesSagas from 'containers/UserPagesContainer/sagas';

export function* rootSaga() {
  yield all([
    call(appSagas),
    call(userPagesSagas),
  ]);
}

export default rootSaga;
