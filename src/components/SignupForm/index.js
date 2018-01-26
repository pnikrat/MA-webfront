// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void
}

class SignupForm extends Component<Props> {
  props: Props
  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
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
        <hr />
        <Link to="/login" className="btn btn-block btn-secondary">
          Login to your account
        </Link>
      </form>
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
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({ form: 'signup', validate })(SignupForm);
