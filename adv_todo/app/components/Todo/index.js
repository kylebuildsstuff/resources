/**
*
* Todo
*
*/

import React from 'react';

// import styles from './styles.css';

class Todo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);
  }

  deleteTodo() {
    this.props.deleteTodo(this.props.todo.get('id'));
  }

  render() {
    return (
      <div>
        <div>{this.props.todo.get('number')}</div>
        <div>{this.props.todo.get('author')}</div>
        <div>{this.props.todo.get('title')}</div>
        <div
          className="btn btn-danger"
          onClick={this.deleteTodo}
        >
          Delete
        </div>
        <br />
      </div>
    );
  }
}

Todo.propTypes = {
  deleteTodo: React.PropTypes.func,
  todo: React.PropTypes.object,
};

export default Todo;
