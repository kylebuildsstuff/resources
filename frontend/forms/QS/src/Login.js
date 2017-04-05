import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from './actions';

import './Page.css';

class Login extends Component {

  submitForm = (e, values) => {
    e.preventDefault();
    console.log(this.props.form.formValues);
    this.props.login(this.props.form.formValues);
  }

  render() {
    return (
      <div>
        Not here yet..
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    login: (values) => dispatch(loginRequest(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
