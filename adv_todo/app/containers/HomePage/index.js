/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHomePage } from './selectors';

import { createTodo, fetchTodos } from './actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.createTodo = this.props.createTodo.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Hey</h1>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: selectHomePage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createTodo: () => dispatch(createTodo()),
    fetchTodos: () => dispatch(fetchTodos()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
