const initialState = {
  exists: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'nothing':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
