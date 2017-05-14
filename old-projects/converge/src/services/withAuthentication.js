// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

type Props = {
  authenticated: ?boolean
}

type State = {
  global: {
    authenticated: boolean,
  },
}

export const withAuthentication = (ComposedComponent: Object): Object => {
  class Authentication extends React.Component {
    props: Props
    state: State
    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return <Redirect to="/error-page" />;
    }
  }

  function mapStateToProps(state: State) {
    return {
      authenticated: state.global.authenticated,
    }
  }

  return connect(mapStateToProps)(Authentication);
}

export default withAuthentication;
