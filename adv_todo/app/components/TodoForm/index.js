/**
*
* TodoForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from './styles.css';

class TodoForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    console.log('This is the Constructor of TodoForm speaking');
    this.gVar = String(this.props.todo.get('id'));
    console.log(this.gVar);
  }

  componentWillMount() {
    console.log('this is Mounting');
    console.log(this.props.todo);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form className={`${styles.todoForm} card`} onSubmit={handleSubmit(values => alert(values))}>
        <div className={'input-group'} onClick={this.props.changeTodoEditMode}>
          <label htmlFor="title">{this.props.todo.get('title')}</label>
          <div className={'form-control'}>
            <Field name={`Title-${this.props.todo.get('id')}`} component="input" type="text" placeholder="Enter new title" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

TodoForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  todo: React.PropTypes.object,
  // reset: React.PropTypes.func,
};

export default reduxForm({
  form: 'Todo',
})(TodoForm);
