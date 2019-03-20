import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';

import auth from '../../utils/authentication';
import { forwardTo } from '../../utils/helpers';

export function* callGetAPIAndDispatchActionsAndOpenURL(config, urlParser) {
  const newWindow = window.open();
  // perform a 'GET' request to the API and wrap call with proper dispatches.
  yield put({
    type: config.fetchingType,
    fetching: true,
  });
  const res = yield call(
    auth.get,
    config.apiURL,
    auth.getAuthToken(),
  );

  if (res.status_code <= 299) {
    yield put({
      type: config.apiResActionType,
      [config.apiResActionPayloadKey]: res.content,
    });
    yield put({
      type: config.fetchingType,
      fetching: false,
    });
  } else {
    yield put({
      type: config.fetchingType,
      fetching: false,
    });
  }
  newWindow.location.href = urlParser(res);
}

export function* callGetAPIAndDispatchActions(config) {
  // perform a 'GET' request to the API and wrap call with proper dispatches.
  yield put({
    type: config.fetchingType,
    fetching: true,
  });
  const res = yield call(
    auth.get,
    config.apiURL,
    auth.getAuthToken(),
  );

  if (res.status_code <= 299) {
    yield put({
      type: config.apiResActionType,
      [config.apiResActionPayloadKey]: res.content,
    });
    yield put({
      type: config.fetchingType,
      fetching: false,
    });
  } else {
    yield put({
      type: config.fetchingType,
      fetching: false,
    });
  }
}

export function* callPostAPIAndDispatchActions(config) {
  // perform a 'POST' request to the API and wrap call with proper dispatches.
  yield put({
    type: config.fetchingType,
    fetching: true,
  });
  const res = yield call(
    auth.postWithToken,
    config.apiURL,
    config.apiPostData,
  );

  if (config.apiResCallbackActionType) {
    yield put({ type: config.apiResCallbackActionType });
  }

  if (res.status_code <= 299) {
    yield put({
      type: config.apiResActionType,
      [config.apiResActionPayloadKey]: res.content,
    });
    yield put({
      type: config.fetchingType,
      fetching: false,
    });

    if (config.resolve && config.resolve.resolve) {
      config.resolve.resolve();
      if (config.resolve.urlToForwardTo) {
        forwardTo(config.resolve.urlToForwardTo, config.resolve.forwardDelay || 0);
      }
      if (config.resolve.actionToDispatch) {
        yield put(config.resolve.actionToDispatch);
      }
    }
  } else {
    yield put({
      type: config.fetchingType,
      fetching: false,
    });
    if (config.reject) {
      config.reject(new SubmissionError({ _error: res.message }));
    }
  }
}
