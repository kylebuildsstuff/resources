/*
 *
 * HomePage actions
 *
 */

import {
  TODO_CREATING,
} from './constants';

export function createTodo() {
  return {
    type: TODO_CREATING,
  }
}
