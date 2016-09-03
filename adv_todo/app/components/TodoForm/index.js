/**
*
* TodoForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from './styles.css';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    const data = this.props.todo.set(
      'title', formData.get(`title-${this.props.todo.get('id')}`
    ));
    this.props.updateTodo(data);
    this.props.changeTodoEditMode();
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className={`${styles.todoForm} card`}
        onSubmit={handleSubmit(this._handleSubmit)}
      >

        <div className="card-block">
          <label htmlFor="title">{this.props.todo.get('title')}</label>
          <div className={'form-group'}>
            <Field
              name={`title-${this.props.todo.get('id')}`}
              component="input"
              type="text"
              placeholder="Enter new title"
              className="form-control"
            />
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
  todo: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  updateTodo: React.PropTypes.func,
  changeTodoEditMode: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  form: 'todoForm',
})(TodoForm);
