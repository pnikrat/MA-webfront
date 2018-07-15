import { combineReducers } from 'redux';
import { reduxTokenAuthReducer as reduxTokenAuth } from 'redux-token-auth';
import { reducer as form } from 'redux-form';
import listsReducer from '../lists/ListsReducer';
import itemsReducer from '../items/ItemsReducer';
import { modalsReducer } from './ModalsState';
import apiMessagesReducer from '../services/apiMessagesReducer';
import apiLoadingReducer from '../services/apiLoadingReducer';
import searchReducer from '../search/SearchReducer';
import groupsReducer from '../groups/GroupsReducer';

const appReducer = combineReducers({
  form,
  reduxTokenAuth,
  listsReducer,
  itemsReducer,
  modalsReducer,
  apiMessagesReducer,
  apiLoadingReducer,
  searchReducer,
  groupsReducer,
});

export default appReducer;
