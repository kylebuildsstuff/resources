import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { login } from 'containers/AppContainer/actions';
import Login from 'pages/appPages/Login';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  clearForm = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      username: null,
      password: null,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formSubmitData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(formSubmitData);
    this.clearForm();
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    if (this.props && this.props.authenticated) {
      return <Redirect to="/user/cards" />
    }
    return (
      <Login
        clearForm={this.clearForm}
        handleSubmit={this.handleSubmit}
        handleUsernameChange={this.handleUsernameChange}
        handlePasswordChange={this.handlePasswordChange}
        usernameValue={this.state.username}
        passwordValue={this.state.password}
      />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  authenticating: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    login: (formSubmitData) => dispatch(login(formSubmitData)),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(LoginContainer));
