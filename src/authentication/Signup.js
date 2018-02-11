// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { registerUser } from '../auth-config';
import SignupForm from './SignupForm';
import Navbar from '../common/Navbar';

type Props = {
  redirect: () => void,
  sendRegistrationRequest: (Object) => Promise<void>
}

class Signup extends Component<Props> {
  props: Props

  handleSignup = (data) => {
    const { redirect, sendRegistrationRequest } = this.props;
    sendRegistrationRequest(data).then(() => redirect());
  };

  render() {
    return (
      <div>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    redirect: () => dispatch(push('/')),
    sendRegistrationRequest: data => dispatch(registerUser(data))
  }
);

export default connect(null, mapDispatchToProps)(Signup);
