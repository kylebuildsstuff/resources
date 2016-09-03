/**
*
* HomePageMainSection
*
*/

import React from 'react';

import Todo from '../Todo';
import styles from './styles.css';

class HomePageMainSection extends React.Component {
  constructor(props) {
    super(props);

    this.renderTodos = this.renderTodos.bind(this);
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  renderTodos(todo) {
    if (!todo) {
      return <div>No Todos</div>;
    }
    return (
      <div key={todo.get('id')}>
        <Todo
          todo={todo}
          updateTodo={this.props.updateTodo}
          deleteTodo={this.props.deleteTodo}
        />
      </div>
    );
  }

  render() {
    if (!this.props.todos) {
      return <div>No Todos</div>;
    }

    return (
      <div className={styles.homePageMainSection}>
        <h1>Hey I'm the Main Section</h1>
        <div>
          {this.props.todos.get('todos').map(this.renderTodos)}
        </div>
      </div>
    );
  }
}

HomePageMainSection.propTypes = {
  fetchTodos: React.PropTypes.func,
  updateTodo: React.PropTypes.func,
  deleteTodo: React.PropTypes.func,
  todos: React.PropTypes.object,
};

export default HomePageMainSection;
