// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { generateRequireSignInWrapper } from 'redux-token-auth';
import Home from './Home';
import NotFound from '../common/NotFound';
import SignupContainer from '../authentication/SignupContainer';
import SigninContainer from '../authentication/SigninContainer';
import history from '../router/History';
import ItemsContainer from '../items/ItemsContainer';
import Navbar from '../common/Navbar';
import '../styles/common.css';


const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signin',
});

function App() {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/signin" component={SigninContainer} />
          <Route
            path="/list/:id/items"
            component={requireSignIn(ItemsContainer)}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
