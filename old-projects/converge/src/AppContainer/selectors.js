// @flow
import { createSelector } from 'reselect';

export const selectGlobal = (state: { global: Object }) => state.global;

export const selectAuthenticating: () => mixed = createSelector(
  selectGlobal,
  (globalState) => globalState.authenticating,
);

export const selectAuthenticated: () => mixed = createSelector(
  selectGlobal,
  (globalState) => globalState.authenticated,
);

export const selectGoals: () => mixed = createSelector(
  selectGlobal,
  (globalState) => globalState.goals,
);

export const selectUser: () => mixed = createSelector(
  selectGlobal,
  (globalState) => globalState.user,
);
