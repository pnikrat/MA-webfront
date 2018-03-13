// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../auth-config';
import SignupForm from './SignupForm';
import withAuth from './withAuth';
import '../styles/authentication.css';

type Props = {
  currentUser: Object,
  redirect: () => void,
  sendRegistrationRequest: (Object) => Promise<void>
}

const SignupFormWithAuth = withAuth(SignupForm);

class SignupContainer extends Component<Props> {
  render() {
    const { currentUser, redirect, sendRegistrationRequest } = this.props;
    return (
      currentUser.isSignedIn ? <Redirect to="/" /> :
      <SignupFormWithAuth
        headerText="Create an account"
        path="/signin"
        linkName="Already have an account?"
        errorCode={422}
        redirect={redirect}
        sendAuthRequest={sendRegistrationRequest}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(push('/')),
  sendRegistrationRequest: data => dispatch(registerUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
