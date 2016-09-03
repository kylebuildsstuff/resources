/**
*
* Todo
*
*/

import React from 'react';
import styles from './styles.css';
import TodoForm from '../TodoForm';

class Todo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.renderTodo = this.renderTodo.bind(this);
    this.changeTodoEditMode = this.changeTodoEditMode.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  changeTodoEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  deleteTodo(e) {
    e.stopPropagation();
    this.props.deleteTodo(this.props.todo.get('id'));
  }

  renderTodo() {
    if (this.state.editMode) {
      return (
        <TodoForm
          todo={this.props.todo} changeTodoEditMode={this.changeTodoEditMode}
          updateTodo={this.props.updateTodo}
        />
      );
    }

    return (
      <div className={styles.Todo} onClick={this.changeTodoEditMode}>
        <div className="card card-block">
          <p className="card-title">{this.props.todo.get('title')}</p>
          <i
            className={`${styles.deleteIcon} btn btn-danger fa fa-times`}
            onClick={this.deleteTodo}
          ></i>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-xs-6 col-sm-4">
        {this.renderTodo()}
      </div>
    );
  }
}

Todo.propTypes = {
  updateTodo: React.PropTypes.func,
  deleteTodo: React.PropTypes.func,
  todo: React.PropTypes.object,
};

export default Todo;

// this.deleteTodo = this.deleteTodo.bind(this);
// this.handleInputChange = this.handleInputChange.bind(this);
// this.handleFormSubmit = this.handleFormSubmit.bind(this);
// handleFormSubmit(event) {
//   event.preventDefault();
//   const data = this.props.todo.set('title', this.state.term);
//   this.props.updateTodo(data);
//   this.setState({
//     term: '',
//   });
// }
//
//
// handleInputChange(event) {
//   this.setState({
//     term: event.target.value,
//   });
// }
//
// deleteTodo() {
//   this.props.deleteTodo(this.props.todo.get('id'));
// }
//
// <div>{this.props.todo.get('number')}</div>
// <div>{this.props.todo.get('author')}</div>
// <div>{this.props.todo.get('title')}</div>
// <form
//   onSubmit={this.handleFormSubmit}
//   className="input-group"
// >
//   <input
//     placeholder="edit ths thing"
//     className="form-control"
//     value={this.state.term}
//     onChange={this.handleInputChange}
//   />
//   <button
//     type="submit"
//     className="btn btn-secondary"
//   >
//       Submit
//   </button>
// </form>
// <div
//   className="btn btn-danger"
//   onClick={this.deleteTodo}
// >
//   Delete
// </div>
// <br />
