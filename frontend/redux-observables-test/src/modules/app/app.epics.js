import { combineEpics } from "redux-observable";
import { map } from "rxjs/add/operator/map";

const appEpic = (action$, store) => {
  return action$.ofType("USER/LOGIN").map(() => {
    return { type: "WHATWHAT" };
  });
};

export default combineEpics(appEpic);
