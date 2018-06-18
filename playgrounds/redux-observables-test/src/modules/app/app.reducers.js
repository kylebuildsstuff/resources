import APP from "./app.constants";

const initialState = {
  count: 0
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP.COUNT_INCREASED:
      return Object.assign({}, state, { count: state.count + 1 });
    case APP.COUNT_DECREASE:
      return Object.assign({}, state, { count: state.count - 1 });
    default:
      return state;
  }
};

export default appReducer;
