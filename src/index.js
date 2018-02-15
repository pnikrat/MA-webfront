import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import store from './state/Store';
import { verifyCredentials } from './auth-config';
import App from './main/App';

verifyCredentials(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
