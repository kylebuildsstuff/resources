import { combineEpics } from "redux-observable";

import appEpic from "modules/app/app.epics";

export const createRootEpic = (extraEpics = []) => {
  return combineEpics(appEpic, ...extraEpics);
};

export default createRootEpic;
