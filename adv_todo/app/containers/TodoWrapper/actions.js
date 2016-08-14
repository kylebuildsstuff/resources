/*
 *
 * TodoWrapper actions
 *
 */

import {
  TODOS_REQUESTING,
} from './constants';

export function requestTodos() {
  return {
    type: TODOS_REQUESTING,
  };
}
