/**
*
* Register
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextInput from '../../utils/forms/TextInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import validate from './validate';
import normalizers from '../../utils/forms/normalizers';

const Register = (props) => {
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
          name="postal_code"
          type="text"
          component={TextInput}
          placeholder="Enter postal code"
          label="Postal code"
          normalize={normalizers.postalCode}
          maxlength="7"
        />
        <Field
          name="password1"
          type="password"
          component={TextInput}
          placeholder="Enter your password"
          label="Password"
          helpText="8 characters, 1 uppercase, 1 number"
        />
        <Field
          name="password2"
          type="password"
          component={TextInput}
          placeholder="Confirm password"
          label="Confirm Password"
        />
      </div>
      {error && <small className="warning">{error}</small>}
      <FormSubmitButton btnCopy="Sign Up" {...props} />
    </form>
  );
};

Register.propTypes = {
  handleSubmit: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'register',
  validate,
})(Register);
