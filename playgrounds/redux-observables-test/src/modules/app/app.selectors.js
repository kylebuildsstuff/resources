import { createSelector } from "reselect";

export const selectApp = state => state.app;

export const selectCount = createSelector(
  selectApp,
  appState => appState.count
);
