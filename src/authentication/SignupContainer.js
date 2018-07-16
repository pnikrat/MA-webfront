// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { registerUser } from '../auth-config';
import SignupForm from './SignupForm';
import withAuth from './WithAuth';

type Props = {
  currentUser: Object,
  location: Object,
  redirect: () => void,
  sendRegistrationRequest: (Object) => Promise<void>
}

const SignupFormWithAuth = withAuth(SignupForm);

class SignupContainer extends Component<Props> {
  parseToken = () => {
    const { search } = this.props.location;
    const params = queryString.parse(search);
    return params.invite_token ? { invite_token: params.invite_token } : undefined;
  }

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
        tokenParam={this.parseToken()}
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
