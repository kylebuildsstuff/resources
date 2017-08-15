import { TODOS } from './todos.constants';

export const createTodo = () => {
  return {
    type: TODOS.CREATE,
  };
}

export const broadcastCreatedTodo = (data) => {
  return {
    type: TODOS.CREATE_SUCCEEDED,
    data: data,
  };
}

export const fetchAllTodos = () => {
  return {
    type: TODOS.FETCH
  };
}

export const broadcastFetchedTodos = (data) => {
  return {
    type: TODOS.FETCH_SUCCEEDED,
    data: data,
  };
}

export const updateTodo = (todoId, data) => {
  return {
    type: TODOS.UPDATE,
    todoId: todoId,
    data: data,
  };
}

export const broadcastUpdatedTodo = (todoId, data) => {
  return {
    type: TODOS.UPDATE_SUCCEEDED,
    todoId: todoId,
    data: data,
  };
}

export const deleteTodo = (todoId) => {
  return {
    type: TODOS.DELETE,
    todoId: todoId,
  };
}

export const broadcastDeletedTodo = (todoId) => {
  return {
    type: TODOS.DELETE_SUCCEEDED,
    todoId: todoId,
  };
}
