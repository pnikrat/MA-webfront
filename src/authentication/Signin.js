// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { signInUser } from '../auth-config';
import SigninForm from './SigninForm';

type Props = {
  redirect: () => void,
  sendLoginRequest: (Object) => Promise<void>
}

class Signin extends Component<Props> {
  props: Props

  handleSignin = (data) => {
    const { redirect, sendLoginRequest } = this.props;
    return sendLoginRequest(data)
      .then(() => redirect()).catch(e => this.handleInvalidSignin(e));
  };

  handleInvalidSignin = (error) => {
    if (error.response && error.response.status === 401) {
      throw new SubmissionError({
        _error: 'Login failed!'
      });
    } else {
      throw new SubmissionError({
        _error: 'Server error, please try again later.'
      });
      // use Appsignal to report in production
    }
  }

  render() {
    return (
      <div>
        <SigninForm onSubmit={this.handleSignin} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    redirect: () => dispatch(push('/')),
    sendLoginRequest: data => dispatch(signInUser(data))
  }
);

export default connect(null, mapDispatchToProps)(Signin);
