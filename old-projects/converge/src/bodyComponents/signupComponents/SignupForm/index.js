import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => mixed,
  signup: () => mixed,
};

export class SignupForm extends React.Component {
  props: Props;
  render() {
    const { handleSubmit, signup } = this.props;
    return (
      <form onSubmit={handleSubmit(signup)}>
        <h3>Signup</h3>
        <div>
          <label htmlFor="username">Username</label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
};

export default reduxForm({
  form: 'signup',
})(SignupForm);
