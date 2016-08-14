/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHomePage } from './selectors';
import styles from './styles.css';
import TodoWrapper from '../TodoWrapper';

import { createTodo } from './actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.homePage}>
        <h1 className={styles.h1}>Home Page</h1>
        <div className={styles.buttonContainer}>
          <div className="btn btn-primary" onClick={this.props.createTodo.bind(this)}>Create</div>
        </div>

        <div className={styles.todoWrapper}>
          <TodoWrapper/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectHomePage(),
})

function mapDispatchToProps(dispatch) {
  return {
    createTodo: () => dispatch(createTodo()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
