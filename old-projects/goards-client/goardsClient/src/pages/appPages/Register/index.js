import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'components/TextField';

export const Register = (props) => {
  if (props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <h4>Register</h4>
        <div>Username</div>
        <TextField
          name="Username"
          type="text"
          handleChange={props.handleUsernameChange}
          placeholder="username"
          value={props.usernameValue}
        />
        <div>Password</div>
        <TextField
          name="Password"
          type="password"
          handleChange={props.handlePasswordChange}
          placeholder="Password"
          value={props.passwordValue}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
  return null;
}

Register.propTypes = {
  clearForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  usernameValue: PropTypes.string,
  passwordValue: PropTypes.string,
};

export default Register;
