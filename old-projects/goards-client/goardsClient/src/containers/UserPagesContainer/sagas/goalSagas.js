import { all, call } from 'redux-saga/effects'

import rootDeckSaga from './deckSagas';
import rootHandSaga from './handSagas';
import rootCardSaga from './cardSagas';
import rootMiniCardSaga from './miniCardSagas';
import rootCommentSaga from './commentSagas';

export function* rootGoalSaga() {
  yield all([
    call(rootDeckSaga),
    call(rootHandSaga),
    call(rootCardSaga),
    call(rootMiniCardSaga),
    call(rootCommentSaga),
  ]);
}

export default rootGoalSaga;
