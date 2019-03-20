/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextInput from '../../utils/forms/TextInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import validate from './validate';

const ResetPasswordForm = (props) => {
  const { handleSubmit, error } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        component={TextInput}
        placeholder="Enter your email"
        label="Email"
      />
      {error && <small>{error}</small>}
      <FormSubmitButton btnCopy="Submit" {...props} />
    </form>
  );
};

ResetPasswordForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPasswordForm);
