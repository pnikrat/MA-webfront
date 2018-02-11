// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Link } from 'react-router-dom';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class SigninForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Login to your account</h3>
          { error && <strong>{error}</strong> }
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
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-block btn-primary"
          >
            {submitting ? 'Submitting...' : 'Sign in'}
          </button>
        </form>
        <div>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
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
