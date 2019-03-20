import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ROUTE_ACTION_TYPES } from 'src/core/routes/routes.types';

import { Home } from './home.component';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  ping: () => {
    dispatch({ type: 'PING' });
  },
  visitAbout: () => {
    dispatch({ type: ROUTE_ACTION_TYPES.ABOUT });
  },
  visitUser: (userId: number) => {
    dispatch({ type: ROUTE_ACTION_TYPES.USER, params: { userId } });
  },
  visitNested: () => {
    dispatch({ type: ROUTE_ACTION_TYPES.NESTED });
  },
});

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
