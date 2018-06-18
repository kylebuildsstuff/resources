import { take, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';
import { forwardTo } from '../../utils/helpers';
import auth from '../../utils/authentication';

import { REGISTER_REQUEST } from './constants';

export function* registerFlow() {
  while (true) { // eslint-disable-line
    const request = yield take(REGISTER_REQUEST);

    const resolve = request.resolve;
    const reject = request.reject;

    const response = yield call(auth.post, '/api/users/create/', request.values.toJS());

    if (response.status_code === 200) {
      forwardTo('/registered', 2500);
      resolve();
    } else {
      reject(new SubmissionError({ _error: 'Could not register user, please call 1-800-268-7649' }));
    }
  }
}

export default [
  registerFlow,
];
