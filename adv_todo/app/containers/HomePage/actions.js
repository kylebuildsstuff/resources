/*
 *
 * HomePage actions
 *
 */

import {
  CREATING_TODO,
} from './constants';

export function createTodo() {
  console.log('actions step 1')
  return {
    type: CREATING_TODO,
  }
}
