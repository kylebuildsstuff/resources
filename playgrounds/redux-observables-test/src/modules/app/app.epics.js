import { combineEpics } from "redux-observable";
import { map } from "rxjs/add/operator/map";

import APP from "./app.constants";
import appActions from "./app.actions";

const watchCountIncreaseEpic = (action$, store) => {
  return action$.ofType(APP.COUNT_INCREASE).map(() => {
    return appActions.broadcastIncreasedCount();
  });
};

const watchCountDecreaseEpic = (action$, store) => {
  return action$.ofType(APP.COUNT_DECREASE).map(action$ => {
    console.log("sup: ", action$);
    return appActions.broadcastDecreasedCount();
  });
};

export default combineEpics(watchCountIncreaseEpic, watchCountDecreaseEpic);
