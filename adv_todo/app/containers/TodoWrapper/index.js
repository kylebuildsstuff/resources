/*
 *
 * TodoWrapper
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectTodoWrapper from './selectors';
import styles from './styles.css';

export class TodoWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.todoWrapper}>
        <h1>This is the TodoWrapper</h1>
        <div className={styles.listWrapper}>

        </div>
      </div>
    );
  }
}

const mapStateToProps = selectTodoWrapper();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoWrapper);
