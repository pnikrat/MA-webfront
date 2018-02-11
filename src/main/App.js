// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { generateRequireSignInWrapper } from 'redux-token-auth';
import Home from './Home';
import NotFound from '../common/NotFound';
import Signup from '../authentication/Signup';
import history from '../router/History';

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signup',
});

function App() {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
