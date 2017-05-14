// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => mixed,
  submitGoalEdit: () => mixed,
}

export class GoalCardModalDescriptionForm extends React.Component {
  props: Props;
  render() {
    const { handleSubmit, submitGoalEdit } = this.props;
    return (
      <form onSubmit={handleSubmit(submitGoalEdit)}>
        <div>
          <label htmlFor="description">Description</label>
          <Field name="description" component="input" type="text" />
        </div>
        <button type="submit">Save Description</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'goalCardModalDescription',
})(GoalCardModalDescriptionForm);
