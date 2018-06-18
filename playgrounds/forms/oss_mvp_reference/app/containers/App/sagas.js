/* eslint-disable */
import { take, call, put, race, fork, cancel, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { selectGlobalJS } from './selectors';
import { SubmissionError } from 'redux-form/immutable';
import { forwardTo } from '../../utils/helpers';
import auth from '../../utils/authentication';
import {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  SENDING,
  REQUEST_ACCOUNT_DATA,
  REQUEST_DATA_SUCCESS,
  SET_HEALTH_STATUS,
} from './constants';

// Using select() in sagas
const global = state => state.get('global').toJS();
// const g = yield select(global);
// console.log('global: ', g.authed);

let authed;
let health;
let timer = 300 * 1000; // 5 minutes

function* login(creds, resolve, reject) {
  console.log('%c ** login saga running **', 'color: green;');

  const response = yield race({
    response: call(auth.post, '/api/auth/jwt/token/', creds),
    signout: take(LOGOUT),
  });

  if (response.response.status_code === 200) {
    // login succeeded
    yield call(auth.setAuthToken, response.response.content.token);
    // yield put({ type: LOGIN_SUCCESS, authed: true });
    resolve();
    return true;
  } else {
    reject(new SubmissionError({ _error: 'Login failed' }));
    // yield put({ type: LOGIN_ERROR, authed: false });
    return false;
  }
}

function* logout() {
  console.log('%c ** logout saga running! **', 'color: green;');
  authed = false;
  yield call(auth.removeAuthToken);
  yield put({ type: LOGOUT_SUCCESS });
}

function* authFlow() {
  console.log('%c ** authFlow begins **', 'color: green;');

  // initialize by attempting a token refresh
  authed = yield call(auth.init);

  while (true) {
    if (!authed) {
      const loginRequest = yield take(LOGIN);

      const resolve = loginRequest.resolve;
      const reject = loginRequest.reject;

      authed = yield call(login, loginRequest.values.toJS(), resolve, reject);
    }

    let userSignedOut;

    if (authed) {
      yield put({ type: LOGIN_SUCCESS, authed: true });
      // we have to set userSignedOut based on authed true/false
      userSignedOut = false;
    } else {
      yield put({ type: LOGIN_ERROR, authed: false });
      // we have to set userSignedOut based on authed true/false
      userSignedOut = true;
    }

    while (!userSignedOut) {
      const { expired, timeout, signout } = yield race({
        expired: delay(120000),
        signout: take(LOGOUT),
      });

      if (expired) {
        authed = yield call(auth.init);
        if (!authed) {
          userSignedOut = true;
          yield call(logout);
        }
      } else {
        userSignedOut = true;
        yield call(logout);
      }
    }
    // this point reached only after !userSignedOut becomes false
  }
}

function* apiCall() {
  console.log('%c ** apiCall begins **', 'color: green;');
  while (true) {
    console.log('authed: ', authed);
    yield take(REQUEST_ACCOUNT_DATA);

    yield put({ type: SENDING, sending: true });
    const global = yield select(selectGlobalJS());

    if (global.policies.length === 0) {
      // get pivotal contact and hit policies URL
      let primary = yield call(auth.get, '/api/users/contact/');
      let policies = yield call(auth.get, '/api/users/policy/');

      // filter out to display only active policies

      if (primary.status_code !== 200 || policies.status_code !== 200) {
        console.log('the saga couldnt get the data!');
      } else {
        const activePols = policies.content.filter(p => p.active === true);

        // check to ensure some data is available
        if (!primary.content || !policies.content) {
          // no data or unusable data in contact or policies
          console.log('couldn\'t get required data!'); // eslint-disable-line
        } else if (activePols.length === 0) {
          // no active policies on acct
          yield put({
            type: REQUEST_DATA_SUCCESS,
            primary: primary.content,
            policies: [],
          });
        } else {
          // fetch all policies from individual URLs

          const policiesArray = yield activePols.map(
            (item) => call(auth.get, item.url)
          );

          // this function checks that each policy has content,
          // then returns the content block
          const finalPolicies = policiesArray.filter((policy) => {
            return policy.content;
          }).map((pol) => pol.content);

          yield put({
            type: REQUEST_DATA_SUCCESS,
            primary: primary.content,
            policies: finalPolicies,
          });
        }
      }
    }
    // do nothing, policies are already in state
    yield put({ type: SENDING, sending: false });
  }
}

function* healthWatcher() {
  console.log('%c ** healthWatcher running **', 'color: green;');
  while (true) {
    health = yield call(auth.healthCheck);
    if (!health) {
      yield put({ type: SET_HEALTH_STATUS, health: false });
    } else {
      yield put({ type: SET_HEALTH_STATUS, health: true });
    }
    yield delay(30000);
  }
}

function* sessionTimer() {
  console.log('session timer begins');
  authed = yield call(auth.init);
  console.log('session timer authed: ', authed);
  let i = 1;
  while (authed) {
    console.log('authed true in the session timer');
    yield delay(30000);
    i = i + 1;
    console.log('timer ends, i: ', i);

    // console.log('%c ** Session timer running **', 'color: green;');
    // const g = yield select(global);
    //
    // yield delay(30000);
    // console.log('timer ends!');
  }
  console.log('end of session timer');
}

export default function* rootSaga() {
  yield fork(authFlow);
  yield fork(apiCall);
  yield fork(healthWatcher);
  yield fork(sessionTimer);
}
