/**
*
* MiniLogin
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FormSubmitButton from '../../components/FormSubmitButton';
import TextInput from '../../utils/forms/TextInput';
import validate from './validate';

const MiniLogin = (props) => {
  const { handleSubmit, error } = props;
  return (
    <form className="mini-login full-width" onSubmit={handleSubmit}>
      <h3>Log In to QuickServe</h3>
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
      {error && <small className="form-warning">{error}</small>}
      <FormSubmitButton forgotPw btnCopy="Log In" {...props} />
    </form>
  );
};

MiniLogin.propTypes = {
  handleSubmit: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'homeLogin',
  validate,
})(MiniLogin);
