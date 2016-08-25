/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectHomePage } from './selectors';

import { createTodo, fetchTodos, deleteTodo } from './actions';
import HomePageWrapper from '../../components/HomePageWrapper';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <HomePageWrapper {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: selectHomePage(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createTodo: () => dispatch(createTodo()),
    fetchTodos: () => dispatch(fetchTodos()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
