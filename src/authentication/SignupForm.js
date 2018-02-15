// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Link } from 'react-router-dom';
import { Container, Form, Header, Message, Segment } from 'semantic-ui-react';
import Input from '../common/Input';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class SignupForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <Container>
        <Header as="h3" attached="top">Create an account</Header>
        <Segment attached padded color="blue">
          <Form onSubmit={handleSubmit}>
            { error && <Message negative>{error}</Message> }
            <Field
              name="email"
              type="email"
              label="Email address"
              required
              component={Input}
              placeholder="your-mail@domain.com"
              className="form-control"
            />
            <Field
              name="password"
              type="password"
              label="Password"
              required
              component={Input}
              placeholder="Password"
              className="form-control"
            />
            <Field
              name="passwordConfirmation"
              type="password"
              label="Password confirmation"
              required
              component={Input}
              placeholder="Password confirmation"
              className="form-control"
            />
            <Field
              name="firstName"
              type="text"
              label="First name"
              required
              component={Input}
              placeholder="First name"
              className="form-control"
            />
            <Field
              name="lastName"
              type="text"
              label="Last name"
              component={Input}
              placeholder="Last name"
              className="form-control"
            />
            <Form.Button
              type="submit"
              disabled={submitting}
              color="blue"
            >
              {submitting ? 'Submitting...' : 'Sign up'}
            </Form.Button>
          </Form>
          <div>
            <Link to="/signin">Already have an account?</Link>
          </div>
        </Segment>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({ form: 'signup', validate })(SignupForm);
