// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Link } from 'react-router-dom';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class SignupForm extends Component<Props> {
  props: Props

  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Create an account</h3>
          <Field
            name="email"
            type="email"
            component="input"
            placeholder="Email"
            className="form-control"
          />
          <Field
            name="password"
            type="password"
            component="input"
            placeholder="Password"
            className="form-control"
          />
          <Field
            name="passwordConfirmation"
            type="password"
            component="input"
            placeholder="Password confirmation"
            className="form-control"
          />
          <Field
            name="firstName"
            type="text"
            component="input"
            placeholder="First name"
            className="form-control"
          />
          <Field
            name="lastName"
            type="text"
            component="input"
            placeholder="Last name"
            className="form-control"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-block btn-primary"
          >
            {submitting ? 'Submitting...' : 'Sign up'}
          </button>
        </form>
        <div>
          <Link to="/signin">Already have an account?</Link>
        </div>
      </div>
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
