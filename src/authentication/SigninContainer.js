// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { Container, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { signInUser } from '../auth-config';
import SigninForm from './SigninForm';
import '../styles/authentication.css';

type Props = {
  redirect: () => void,
  sendLoginRequest: (Object) => Promise<void>
}

class SigninContainer extends Component<Props> {
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
    }
  }

  render() {
    return (
      <Container>
        <Segment>
          <Header as="h3" className="with-divider">
            Login to your account
          </Header>
          <SigninForm onSubmit={this.handleSignin} />
          <div className="larger-top-margin">
            <Link to="/signup">Don't have an account?</Link>
          </div>
        </Segment>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(push('/')),
  sendLoginRequest: data => dispatch(signInUser(data))
});

export default connect(null, mapDispatchToProps)(SigninContainer);
