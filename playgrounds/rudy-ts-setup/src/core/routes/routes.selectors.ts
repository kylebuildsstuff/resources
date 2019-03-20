import { createSelector } from 'reselect';

import { StoreState } from 'src/core/store/store.types';

export const selectLocation = (state: StoreState) => state.location || {};

export const selectLocationType = createSelector(
  selectLocation,
  location => location.type || '',
);

export const selectLocationQuery = createSelector(
  selectLocation,
  location => location.query || {},
);

export const selectLocationParams = createSelector(
  selectLocation,
  location => location.params || {},
);

export const selectLocationState = createSelector(
  selectLocation,
  location => location.query || {},
);
