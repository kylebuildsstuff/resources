// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => mixed,
  submitGoalEdit: () => mixed,
}

export class GoalCardModalTitleForm extends React.Component {
  props: Props;
  render() {
    const { handleSubmit, submitGoalEdit } = this.props;
    return (
      <form onSubmit={handleSubmit(submitGoalEdit)}>
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" />
        </div>
        <button type="submit">Save Title</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'goalCardModalTitle',
})(GoalCardModalTitleForm);
