/*
 *
 * TodoWrapper
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTodoWrapper } from './selectors';
import styles from './styles.css';
import { requestTodos } from './actions';

export class TodoWrapper extends React.Component {
  componentWillMount() {
    console.log('');
    console.log('Will Mount the TodoWrapper');
    this.props.requestTodos();
    console.log('');
  }

  render() {
    return (
      <div className={styles.todoWrapper}>
        {console.log(this.props.todos)}
        <h1>This is the TodoWrapper</h1>
        <div className={styles.listWrapper}>

        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  todos: selectTodoWrapper(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTodos: () => dispatch(requestTodos()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoWrapper);
