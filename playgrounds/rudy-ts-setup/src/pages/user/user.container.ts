import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ROUTE_ACTION_TYPES } from 'src/core/routes/routes.types';
import { StoreState } from 'src/core/store/store.types';

import { User } from './user.component';
import { selectUserIdParam } from './user.selectors';

export const UserContainer = connect(
  (state: StoreState) => ({
    userId: selectUserIdParam(state),
  }),
  (dispatch: Dispatch) => ({
    visitHome: () => {
      dispatch({ type: ROUTE_ACTION_TYPES.HOME });
    },
  }),
)(User);
