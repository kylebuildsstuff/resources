import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  logout,
  verifyToken,
  createGoal,
} from './actions'
import {
  selectAuthenticating,
  selectAuthenticated,
} from './selectors';
import App from '../App';

type Props = {
  verifyToken: () => mixed,
  authenticated: boolean,
  authenticating: boolean,
  logout: () => mixed,
  createGoal: () => mixed,
}

type LocalState = {
  loaded: boolean
};

export class AppContainer extends React.Component {
  props: Props;
  state: LocalState;
  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const token: ?string = localStorage.getItem('jwt');
    if (token) {
      this.props.verifyToken(token, () => this.setState({ loaded: true }));
    } else {
      this.setState({
        loaded: true,
      })
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <App
            authenticated={this.props.authenticated}
            authenticating={this.props.authenticating}
            logout={this.props.logout}
            createGoal={this.props.createGoal}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}

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
    createGoal: (token = '') => dispatch(createGoal(token)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
