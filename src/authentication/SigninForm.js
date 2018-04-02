// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class SigninForm extends Component<Props> {
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
        <Form.Button
          type="submit"
          disabled={submitting}
          color="blue"
        >
          {submitting ? 'Submitting...' : 'Sign in'}
        </Form.Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({ form: 'signin', validate })(SigninForm);
