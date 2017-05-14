import rootAuthSaga from './authSagas';
import rootGoalSaga from './goalSagas';
import rootUserSaga from './userSagas';

function* rootSaga() {
  yield [
    rootAuthSaga(),
    rootGoalSaga(),
    rootUserSaga(),
  ];
}

export default rootSaga;
