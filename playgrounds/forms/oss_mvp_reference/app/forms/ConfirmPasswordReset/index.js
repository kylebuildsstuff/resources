/**
*
* ConfirmPasswordReset
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextInput from '../../utils/forms/TextInput';
import validate from './validate';

const ConfirmPasswordReset = (props) => {
  const { invalid, handleSubmit, pristine, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-block">
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
      <div className="btn-group">
        <button className="btn-primary" type="submit" disabled={invalid || pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};

ConfirmPasswordReset.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'confirmReset',
  validate,
})(ConfirmPasswordReset);
