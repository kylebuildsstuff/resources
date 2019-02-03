import { connect } from 'react-redux';

import { StoreState } from 'src/core/store/store.types';

import App from './app.component';

const mapStateToProps = (state: StoreState) => {
  return {
    page: state.page,
  };
};

export const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
