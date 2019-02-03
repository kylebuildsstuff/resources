import { connect } from 'react-redux';

import App from './app.component';
import { StoreState } from 'src/store/store.types';

const mapStateToProps = (state: StoreState) => {
  return {
    page: state.page,
  };
};

export const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
