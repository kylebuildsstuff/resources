import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './components/App/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
});

export default rootReducer;
