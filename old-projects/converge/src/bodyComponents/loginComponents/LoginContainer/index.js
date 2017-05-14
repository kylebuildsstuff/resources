import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../../AppContainer/actions';
import LoginForm from '../LoginForm';

type Props = {
  login: () => mixed,
  authenticated: boolean,
}

export class LoginContainer extends React.Component {
  props: Props;
  login = (formSubmitData: Object) => {
    this.props.login(formSubmitData);
  }

  render() {
    if (this.props && this.props.authenticated) {
      return <Redirect to="user-home" />
    }
    return (
      <div>
        <LoginForm
          login={this.login}
        />
      </div>
    );
  }
};

function mapStateToProps(state: Object) {
  return {
  };
};

function mapDispatchToProps(dispatch: () => mixed) {
  return {
    login: (formSubmitData: Object) => dispatch(login(formSubmitData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
