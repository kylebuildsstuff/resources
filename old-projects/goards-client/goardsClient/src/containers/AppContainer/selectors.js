import { createSelector } from 'reselect';

export const selectApp = state => state.app;

export const selectAuthenticating = createSelector(
  selectApp,
  (appState) => appState.authenticating,
);

export const selectAuthenticated = createSelector(
  selectApp,
  (appState) => appState.authenticated,
);
