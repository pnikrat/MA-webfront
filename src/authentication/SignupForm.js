// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class SignupForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="email"
          type="email"
          label="Email address"
          required
          component={Input}
          placeholder="your-mail@domain.com"
        />
        <Field
          name="password"
          type="password"
          label="Password"
          required
          component={Input}
          placeholder="Password"
        />
        <Field
          name="passwordConfirmation"
          type="password"
          label="Password confirmation"
          required
          component={Input}
          placeholder="Password confirmation"
        />
        <Field
          name="firstName"
          type="text"
          label="First name"
          required
          component={Input}
          placeholder="First name"
        />
        <Field
          name="lastName"
          type="text"
          label="Last name"
          component={Input}
          placeholder="Last name"
        />
        <Form.Button
          type="submit"
          disabled={submitting}
          color="blue"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </Form.Button>
      </Form>
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
