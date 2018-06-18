/**
*
* ChangePassword
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextInput from '../../utils/forms/TextInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import validate from './validate';

const ChangePassword = (props) => {
  const { handleSubmit, error } = props;
  return (
    <form className="full-width" onSubmit={handleSubmit}>
      <div className="form-block">
        <Field
          name="old_password"
          type="password"
          component={TextInput}
          placeholder="Enter current password"
          label="Current Password"
        />
        <Field
          name="new_password1"
          type="password"
          component={TextInput}
          placeholder="Enter your new password"
          label="New Password"
        />
        <Field
          name="new_password2"
          type="password"
          component={TextInput}
          placeholder="Confirm new password"
          label="Confirm Password"
        />
      </div>
      {error && <small className="warning">{error}</small>}
      <FormSubmitButton btnCopy="Submit" {...props} />
    </form>
  );
};

ChangePassword.propTypes = {
  handleSubmit: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'changePassword',
  validate,
})(ChangePassword);
