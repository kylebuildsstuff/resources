import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Home } from './home.component';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  ping: () => {
    dispatch({ type: 'PING' });
  },
});

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
