import { createSelector } from 'reselect';

export const selectUserPages = (state) => state.userPages;

export const selectDecks = createSelector(
  selectUserPages,
  (userPagesState) => userPagesState.decks,
);

export const selectHands = createSelector(
  selectUserPages,
  (userPagesState) => userPagesState.hands,
);

export const selectCards = createSelector(
  selectUserPages,
  (userPagesState) => userPagesState.cards,
);

export const selectMiniCards = createSelector(
  selectUserPages,
  (userPagesState) => userPagesState.miniCards,
);

export const selectComments = createSelector(
  selectUserPages,
  (userPagesState) => userPagesState.comments,
);

export const selectUser = createSelector(
  selectUserPages,
  (userPagesState) => userPagesState.user,
);
