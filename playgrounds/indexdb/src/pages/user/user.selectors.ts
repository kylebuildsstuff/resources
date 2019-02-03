import { createSelector } from 'reselect';

import { selectLocationParams } from 'src/core/routes/routes.selectors';

export const selectUserIdParam = createSelector(
  selectLocationParams,
  params => params.userId || null,
);
