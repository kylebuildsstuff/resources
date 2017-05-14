import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => mixed,
  login: () => mixed,
};

export class LoginForm extends React.Component {
  props: Props;
  render() {
    const { handleSubmit, login } = this.props;
    return (
      <form onSubmit={handleSubmit(login)}>
        <h3>Login</h3>
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
  form: 'login',
})(LoginForm);
