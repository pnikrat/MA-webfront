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
        <Field
          name="passwordConfirmation"
          type="password"
          label="Potwierdź hasło"
          required
          component={Input}
          placeholder="Potwierdź hasło"
        />
        <Field
          name="firstName"
          type="text"
          label="Imię"
          required
          component={Input}
          placeholder="Imię"
        />
        <Field
          name="lastName"
          type="text"
          label="Nazwisko"
          component={Input}
          placeholder="Nazwisko"
        />
        <Form.Button
          type="submit"
          disabled={submitting}
          data-cy="register-button"
          color="blue"
        >
          {submitting ? 'Wysyłanie...' : 'Zarejestruj się'}
        </Form.Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Pole wymagane';
  }
  if (!values.email) {
    errors.email = 'Pole wymagane';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Hasła nie są takie same';
  }
  if (!values.password) {
    errors.password = 'Pole wymagane';
  } else if (values.password.length < 6) {
    errors.password = 'Co najmniej 6 znaków';
  }
  return errors;
};

export default reduxForm({ form: 'signup', validate })(SignupForm);
