import { combineReducers } from 'redux';
import { reduxTokenAuthReducer as reduxTokenAuth } from 'redux-token-auth';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';
import listsReducer from '../lists/ListsReducer';
import itemsReducer from '../items/ItemsReducer';

const appReducer = combineReducers({
  form,
  reduxTokenAuth,
  router,
  listsReducer,
  itemsReducer
});

export default appReducer;
