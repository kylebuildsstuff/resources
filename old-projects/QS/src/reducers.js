import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';
import contactReducer from './contact-reducer';
import formReducer from './form-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  data: contactReducer,
  form: formReducer,
  // form: formReducer,
});

export default rootReducer;
