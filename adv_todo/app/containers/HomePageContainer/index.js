/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectHomePage } from './selectors';

import { createTodo, fetchTodos, updateTodo, deleteTodo } from './actions';
import HomePage from '../../components/home_page/HomePage';

export class HomePageContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <HomePage {...this.props} />
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
    updateTodo: (data) => dispatch(updateTodo(data)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
