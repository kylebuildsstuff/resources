/**
*
* HomePageMainSection
*
*/

import React from 'react';


import styles from './styles.css';

class HomePageMainSection extends React.Component {
  componentWillMount() {
    this.props.fetchTodos();
  }

  renderTodos(todo) {
    if (!todo) {
      return <div></div>
    }
    return (
      <div key={todo.get('number')}>
        <div>{todo.get('number')}</div>
        <div>{todo.get('author')}</div>
        <div>{todo.get('title')}</div>
        <br />
      </div>

    );
  }

  render() {
    if (!this.props.todos) {
      return <div>No Todos</div>
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

export default HomePageMainSection;
