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
import FlashContainer from '../common/FlashContainer';
import Loading from '../common/Loading';
import GroupsContainer from '../groups/GroupsContainer';
import '../styles/common.css';

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signin',
});

function App() {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navbar />
        <FlashContainer />
        <Loading />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/signin" component={SigninContainer} />
          <Route
            path="/lists/:id/items"
            component={requireSignIn(ItemsContainer)}
          />
          <Route
            path="/groups"
            component={requireSignIn(GroupsContainer)}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
