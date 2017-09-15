import { take, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';
import { forwardTo } from '../../utils/helpers';
import auth from '../../utils/authentication';

import { RESET_PASSWORD_REQUEST } from './constants';

export function* resetPasswordFlow() {
  while (true) { // eslint-disable-line
    const request = yield take(RESET_PASSWORD_REQUEST);

    const resolve = request.resolve;
    const reject = request.reject;

    const response = yield call(auth.post, '/api/users/password/reset/', request.values.toJS());

    if (response.status_code === 200) {
      forwardTo('/check-email');
      resolve();
    } else {
      reject(new SubmissionError({ _error: 'A problem occurred, please call 1-800-268-7649' }));
    }
  }
}

export default [
  resetPasswordFlow,
];
