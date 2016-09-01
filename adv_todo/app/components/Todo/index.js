/**
*
* Todo
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

class Todo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const data = this.props.todo.set('title', this.state.term);
    this.props.updateTodo(data);
    this.setState({
      term: '',
    });
  }


  handleInputChange(event) {
    this.setState({
      term: event.target.value,
    });
  }

  deleteTodo() {
    this.props.deleteTodo(this.props.todo.get('id'));
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <div>{this.props.todo.get('number')}</div>
        <div>{this.props.todo.get('author')}</div>
        <div>{this.props.todo.get('title')}</div>
        <form
          onSubmit={this.handleFormSubmit}
          className="input-group"
        >
          <input
            placeholder="edit ths thing"
            className="form-control"
            value={this.state.term}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-secondary"
          >
              Submit
          </button>
        </form>
        <div
          className="btn btn-danger"
          onClick={this.deleteTodo}
        >
          Delete
        </div>
        <br />
        <form onSubmit={handleSubmit(values => console.log(values))}>
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
      </div>
    );
  }
}

Todo.propTypes = {
  updateTodo: React.PropTypes.func,
  deleteTodo: React.PropTypes.func,
  todo: React.PropTypes.object,
};

export default reduxForm({
  form: 'simple',
})(Todo);
