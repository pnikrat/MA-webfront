// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { generateRequireSignInWrapper } from 'redux-token-auth';
import Home from './Home';
import NotFound from '../common/NotFound';
import Signup from '../authentication/Signup';
import Signin from '../authentication/Signin';
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
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
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
