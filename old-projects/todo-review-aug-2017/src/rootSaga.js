import { call, all } from 'redux-saga/effects';

import globalSagas from 'containers/GlobalContainer/sagas';

export function* rootSaga() {
  yield all([
    call(globalSagas)
  ])
}

export default rootSaga;
