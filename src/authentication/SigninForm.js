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
          label="Adres email"
          required
          component={Input}
          placeholder="mail@domain.com"
        />
        <Field
          name="password"
          type="password"
          label="Hasło"
          required
          component={Input}
          placeholder="Hasło"
        />
        <Form.Button
          type="submit"
          data-cy="login-button"
          disabled={submitting}
          color="blue"
        >
          {submitting ? 'Wysyłanie...' : 'Zaloguj się'}
        </Form.Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Pole wymagane';
  }
  if (!values.password) {
    errors.password = 'Pole wymagane';
  }
  return errors;
};

export default reduxForm({ form: 'signin', validate })(SigninForm);
