import { take, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';
import { forwardTo } from '../../utils/helpers';
import auth from '../../utils/authentication';

import { CONFIRM_RESET_PASSWORD } from './constants';

export function* resetPasswordFlow() {
  while (true) { // eslint-disable-line
    const request = yield take(CONFIRM_RESET_PASSWORD);

    const newValues = {
      new_password1: request.values.get('new_password1'),
      new_password2: request.values.get('new_password2'),
      uid: request.uuid,
      token: request.token,
    };

    const resolve = request.resolve;
    const reject = request.reject;

    const response = yield call(auth.post, '/api/users/password/reset/confirm/', newValues);

    if (response.status_code === 200) {
      forwardTo('/login', 2500);
      resolve();
    } else {
      reject(new SubmissionError({ _error: 'A problem occurred, please call 1-800-268-7649' }));
    }
  }
}

export default [
  resetPasswordFlow,
];
