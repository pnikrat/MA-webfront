// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import NotFound from '../common/NotFound';
import Signup from '../authentication/Signup';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
