import expect from 'expect';
import todoWrapperReducer from '../reducer';
import { fromJS } from 'immutable';

describe('todoWrapperReducer', () => {
  it('returns the initial state', () => {
    expect(todoWrapperReducer(undefined, {})).toEqual(fromJS({}));
  });
});
