import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { About } from './about.component';
import { ROUTE_ACTION_TYPES } from 'src/core/routes/routes.types';

export const AboutContainer = connect(
  () => ({}),
  (dispatch: Dispatch) => ({
    visitHome: () => {
      dispatch({ type: ROUTE_ACTION_TYPES.HOME });
    },
  }),
)(About);
