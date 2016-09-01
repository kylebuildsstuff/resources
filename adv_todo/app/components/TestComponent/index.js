/**
*
* TestComponent
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from './styles.css';


function TestComponent(props) {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name" />
        </div>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'simple',
})(TestComponent);
