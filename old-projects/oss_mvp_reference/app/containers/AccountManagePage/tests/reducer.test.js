
import accountManagePageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('accountManagePageReducer', () => {
  it('returns the initial state', () => {
    expect(accountManagePageReducer(undefined, {})).toBe(fromJS({}));
  });
});
