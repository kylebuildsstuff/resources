import expect from 'expect';
import exampleContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('exampleContainerReducer', () => {
  it('returns the initial state', () => {
    expect(exampleContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
