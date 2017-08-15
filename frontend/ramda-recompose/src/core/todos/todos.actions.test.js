import {
  createTodo,
  broadcastCreatedTodo,
  fetchAllTodos,
  broadcastFetchedTodos,
  updateTodo,
  broadcastUpdatedTodo,
  deleteTodo,
  broadcastDeletedTodo,
} from './todos.actions';

describe('createTodo action', () => {
  it('should create the proper action object', () => {
    const action = createTodo();
    expect(action).toMatchSnapshot();
  });
});

describe('broadcastCreatedTodo action', () => {
  it('should create the proper action object', () => {
    const action = broadcastCreatedTodo({ id: 1, name: 'doYourWork' });
    expect(action).toMatchSnapshot();
  });
});

describe('fetchAllTodos action', () => {
  it('should create the proper action object', () => {
    const action = fetchAllTodos();
    expect(action).toMatchSnapshot();
  });
});

describe('broadcastFetchedTodos action', () => {
  it('should create the proper action object', () => {
    const action = broadcastFetchedTodos([{ id: 1, name: 'doYourWork' }]);
    expect(action).toMatchSnapshot();
  });
});

describe('updateTodo action', () => {
  it('should create the proper action object', () => {
    const action = updateTodo(1, { id: 1, name: 'updatedName' });
    expect(action).toMatchSnapshot();
  });
});

describe('broadcastUpdatedTodo action', () => {
  it('should create the proper action object', () => {
    const action = broadcastUpdatedTodo(2, { id: 2, name: 'updatedTodo' });
    expect(action).toMatchSnapshot();
  });
});

describe('deleteTodo action', () => {
  it('should create the proper action object', () => {
    const action = deleteTodo(1);
    expect(action).toMatchSnapshot();
  });
});

describe('broadcastDeletedTodo action', () => {
  it('should create the proper action object', () => {
    const action = broadcastDeletedTodo(1);
    expect(action).toMatchSnapshot();
  });
});
