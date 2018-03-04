import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import { selectAuthenticated } from 'containers/AppContainer/selectors';

export const withAuthentication = (Component) => {
  class Authentication extends React.Component {
    render() {
      if (this.props && this.props.authenticated) {
        return <Component {...this.props} />;
      }
      return <Redirect to="/error-page" />;
    }
  }

  // function mapStateToProps(state) {
  //   return {
  //     authenticated: selectAuthenticated(state),
  //   }
  // }

  return Authentication;
  // return withRouter(connect(mapStateToProps)(Authentication));
}

export default withAuthentication;
