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

class SigninForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <Container>
        <Header as="h3" attached="top">Login to your account</Header>
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
            <Form.Button
              type="submit"
              disabled={submitting}
              color="blue"
            >
              {submitting ? 'Submitting...' : 'Sign in'}
            </Form.Button>
          </Form>
          <div>
            <Link to="/signup">Don't have an account?</Link>
          </div>
        </Segment>
      </Container>
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
