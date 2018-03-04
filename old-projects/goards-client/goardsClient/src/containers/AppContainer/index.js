import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout, verifyToken } from './actions';
import { selectAuthenticated, selectAuthenticating } from './selectors';
import App from 'components/App';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.props.verifyToken(token, () => this.setState({ loaded: true }));
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <App
          authenticated={this.props.authenticated}
          authenticating={this.props.authenticating}
          logout={this.props.logout}
        />
      );
    } else {
      return <div>Loading ...</div>
    }
  }
}

AppContainer.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  verifyToken: PropTypes.func,
  logout: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    authenticated: selectAuthenticated(state),
    authenticating: selectAuthenticating(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    verifyToken: (token = '', callback = false) => dispatch(verifyToken(token, callback)),
    logout: () => dispatch(logout()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
