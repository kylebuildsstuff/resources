/**
*
* FormSubmitButton
*
*/

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

function FormSubmitButton(props) {
  const classNames = classnames('btn-submit', {
    submitting: props.submitting,
  });
  return (
    <div className="btn-group">
      <button
        className={classNames}
        disabled={props.invalid || props.pristine || props.submitting}
      >
        {props.submitting && <FontAwesome name="spinner" spin />}
        {props.btnCopy}
      </button>
      {
        props.forgotPw && (
          <Link className="subtle-link" to="/reset-password">
            <small>Forgot password?</small>
          </Link>
        )
      }
    </div>
  );
}

FormSubmitButton.propTypes = {
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  pristine: React.PropTypes.bool,
  btnCopy: React.PropTypes.string,
  forgotPw: React.PropTypes.bool,
  form: React.PropTypes.string,
};

export default FormSubmitButton;
