// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../auth-config';
import SignupForm from './SignupForm';
import Navbar from '../common/Navbar';

class Signup extends Component {
  handleSignup(e) {
    e.preventDefault();
    const {
      email,
      firstName,
      password,
    } = this.state;
    registerUser({ email, firstName, password })
  }

  render() {
    const { handleSignup } = this;
    return (
      <div>
        <Navbar />
        <SignupForm onSubmit={handleSignup} />
      </div>
    );
  }
}

export default connect(null, { registerUser })(Signup);
