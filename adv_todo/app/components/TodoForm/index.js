/**
*
* TodoForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from './styles.css';

class TodoForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form className={`${styles.todoForm} card`} onSubmit={handleSubmit(values => alert(values))}>

        <div className="card-block">
          <label htmlFor="title">{this.props.todo.get('title')}</label>
          <div className={'form-group'}>
            <Field name={`Title-${this.props.todo.get('id')}`} component="input" type="text" placeholder="Enter new title" className="form-control" />
          </div>
        </div>

        <div className="card-block btn-group" role="group">
          <button
            className="btn btn-success"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
          <button
            className="btn btn-danger fa fa-times"
            onClick={this.props.changeTodoEditMode}
          >
          </button>
        </div>

      </form>
    );
  }
}

TodoForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  changeTodoEditMode: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  todo: React.PropTypes.object,
  // reset: React.PropTypes.func,
};

export default reduxForm({
  form: 'Todo',
})(TodoForm);
