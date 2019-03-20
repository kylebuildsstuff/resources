import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Nested } from './nested.component';
import { ROUTE_ACTION_TYPES } from 'src/core/routes/routes.types';

export const NestedContainer = connect(
  () => ({}),
  (dispatch: Dispatch) => ({
    visitHome: () => {
      dispatch({ type: ROUTE_ACTION_TYPES.HOME });
    },
  }),
)(Nested);
