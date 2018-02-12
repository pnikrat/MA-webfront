import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducers from './Reducers';
import initialState from './InitialState';
import history from '../router/History';

const middleWare = [thunk, routerMiddleware(history)];
const store = createStore(
  reducers, initialState, composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
