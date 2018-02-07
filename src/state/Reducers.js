import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as form } from 'redux-form';

// user reduxTokenAuth ES6 shortcut???
const appReducer = combineReducers({
  form,
  reduxTokenAuth: reduxTokenAuthReducer
});

export default appReducer;
