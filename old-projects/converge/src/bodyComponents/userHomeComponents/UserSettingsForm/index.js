// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => mixed,
  editUser: () => mixed,
  user: Object,
}

export class UserSettingsForm extends React.Component {
  props: Props;
  render() {
    const { handleSubmit, editUser, user } = this.props
    return (
      <form onSubmit={handleSubmit(editUser)}>
        <h3>User Settings</h3>
        <p>{`${user.first_name || 'First Name not found'}`}</p>
        <p>{`${user.last_name || 'Last Name not found'}`}</p>
        <p>{`${user.email || 'Email not found'}`}</p>
        <div>
          <label htmlFor="first_name">First Name</label>
          <Field name="first_name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <Field name="last_name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Update Settings</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'userSettings',
})(UserSettingsForm);
