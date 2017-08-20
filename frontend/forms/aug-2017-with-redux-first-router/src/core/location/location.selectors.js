import { createSelector } from "reselect";

export const selectLocation = state => state.location;

export const selectRoutesMap = createSelector(
  selectLocation,
  locationState => locationState.routesMap
);

export const selectPreviousLocation = createSelector(
  selectLocation,
  locationState => locationState.prev
);

export const selectPageType = createSelector(
  selectLocation,
  locationState => locationState.type
);

export const selectPagePayload = createSelector(
  selectLocation,
  locationState => locationState.payload
);

export const selectPreviousPageType = createSelector(
  selectPreviousLocation,
  previousLocationState => previousLocationState.type
);

export const selectPreviousPagePayload = createSelector(
  selectPreviousLocation,
  previousLocationState => previousLocationState.payload
);
