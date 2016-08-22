/*
 *
 * HomePage actions
 *
 */

import {
  TODO_CREATING,
  TODOS_FETCHING,
  TODO_DELETING
} from './constants';

export function createTodo() {
  return {
    type: TODO_CREATING,
  }
}

export function fetchTodos() {
  return {
    type: TODOS_FETCHING,
  };
}

export function deleteTodo(id) {
  return {
    type: TODO_DELETING,
    payload: id
  };
}
