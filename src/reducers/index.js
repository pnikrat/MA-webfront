import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as form } from 'redux-form';

const appReducer = combineReducers({
  form,
  reduxTokenAuth: reduxTokenAuthReducer
});

export default appReducer;
