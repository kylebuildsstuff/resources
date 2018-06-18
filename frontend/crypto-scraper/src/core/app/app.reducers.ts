import { combineReducers } from 'redux';

export default function createRootReducer(extraReducerObjects?: {}) {
  return combineReducers({
    app: () => {
      return {
        sup: true,
      };
    },
  });
}
