import { combineReducers } from "redux";

import appReducer from "modules/app/app.reducers";

export default function createRootReducer(extraReducerObjects) {
  return combineReducers({
    app: appReducer,
    ...extraReducerObjects
  });
}
