import * as types from './constants';

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FORM_VALUES:
      return Object.assign({}, state, {
        ...state,
        [action.values.name]: action.values,

        // policy_number: 1,
        // formValues: {
        //   ...state.formValues,
        //   [action.values.name]: {
        //     value: action.values.value,
        //     label: action.values.label
        //   },
        // }
      });
    default:
      return state;
  }
};
