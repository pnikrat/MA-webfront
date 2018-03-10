// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { registerUser } from '../auth-config';
import SignupForm from './SignupForm';

type Props = {
  redirect: () => void,
  sendRegistrationRequest: (Object) => Promise<void>
}

class Signup extends Component<Props> {
  props: Props

  handleSignup = (data) => {
    const { redirect, sendRegistrationRequest } = this.props;
    return sendRegistrationRequest(data)
      .then(() => redirect()).catch(e => this.handleInvalidSignup(e));
  };

  handleInvalidSignup = (error) => {
    if (error.response && error.response.status === 422) {
      throw new SubmissionError(error.response.data.errors);
    } else {
      throw new SubmissionError({
        _error: 'Server error, please try again later.'
      });
    }
  }

  render() {
    return (
      <div>
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
