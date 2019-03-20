import { take, call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';
import { forwardTo } from '../../utils/helpers';
import auth from '../../utils/authentication';

import { CHANGE_PW_REQUEST } from './constants';
import { SET_GLOBAL_MESSAGE } from '../App/constants';

export function* changePwFlow() {
  while (true) { // eslint-disable-line
    const request = yield take(CHANGE_PW_REQUEST);

    const resolve = request.resolve;
    const reject = request.reject;

    const response = yield call(auth.postWithToken, '/api/users/password/change/', request.values.toJS());

    if (response.status_code === 200) {
      resolve();
      forwardTo('/account/', 2500);
      yield put({ type: SET_GLOBAL_MESSAGE, globalMessage: 'Your password was changed', globalMessageTimeout: 3000 });
    } else {
      reject(new SubmissionError({ _error: 'Could not change password.' }));
    }
  }
}

export default [
  changePwFlow,
];
