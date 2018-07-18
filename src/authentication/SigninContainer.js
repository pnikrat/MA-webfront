// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import { signInUser } from '../auth-config';
import SigninForm from './SigninForm';
import withAuth from './WithAuth';

type Props = {
  currentUser: Object,
  redirect: () => void,
  sendLoginRequest: (Object) => Promise<void>
}

const SigninFormWithAuth = withAuth(SigninForm);

class SigninContainer extends Component<Props> {
  render() {
    const { currentUser, redirect, sendLoginRequest } = this.props;
    return (
      currentUser.isSignedIn ? <Redirect to="/" /> :
      <SigninFormWithAuth
        headerText="Zaloguj się"
        path="/signup"
        linkName="Nie posiadasz jeszcze konta?"
        errorCode={401}
        redirect={redirect}
        sendAuthRequest={sendLoginRequest}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(push('/')),
  sendLoginRequest: data => dispatch(signInUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
