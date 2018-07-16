import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './Reducers';
import initialState from './InitialState';
import history from '../router/History';
import apiMiddleware from '../services/apiMiddleware';
import locationChangeMiddleware from '../router/locationChangeMiddleware';

const middleWare = [thunk, apiMiddleware, locationChangeMiddleware, routerMiddleware(history)];
const store = createStore(
  connectRouter(history)(reducers), initialState, composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
