/**
*
* Login
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FormSubmitButton from '../../components/FormSubmitButton';
import TextInput from '../../utils/forms/TextInput';
import validate from './validate';

const Login = (props) => {
  const { handleSubmit, error } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-block">
        <Field
          name="email"
          type="email"
          component={TextInput}
          placeholder="Enter your email"
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={TextInput}
          placeholder="Enter your password"
          label="Password"
        />
      </div>
      {error && <small className="form-warning">{error}</small>}
      <FormSubmitButton forgotPw btnCopy="Log In" {...props} />
    </form>
  );
};

Login.propTypes = {
  handleSubmit: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'login',
  validate,
})(Login);
