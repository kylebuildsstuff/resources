/*
 *
 * HomePage actions
 *
 */

import {
  TODO_CREATING,
  TODOS_FETCHING
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
