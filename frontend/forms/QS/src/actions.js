import * as types from './constants';

export const loginRequest = (values) => ({
  type: types.LOGIN_REQUEST,
  values,
});

export const apiRequest = () => ({
    type: types.API_CALL,
});

export const setValues = (values) => {
  return {
    type: types.SET_FORM_VALUES,
    values,
  }
};

export const formInit = (values) => ({
  type: types.INITIALIZE_FORM,
});

export const getValues = () => ({
    type: types.GET_FORM_VALUES,
});
