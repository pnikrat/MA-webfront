// @flow
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';

type Props = {
  onSubmit: (data: Object) => void,
  placeholder?: string,
  submitText: string,
  initialValues: Object,
} & FormProps

const NewInviteForm = ({
  error, submitting, handleSubmit, placeholder, submitText
}: Props) => (
  <Form onSubmit={handleSubmit}>
    { error && <Message negative>{error}</Message> }
    <Field
      name="email"
      type="email"
      label="User email"
      required
      component={Input}
      placeholder={placeholder}
    />
    <Form.Button
      type="submit"
      disabled={submitting}
      color="blue"
    >
      {submitting ? 'Submitting...' : submitText}
    </Form.Button>
  </Form>
);

const validate = (values: Object) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

export default reduxForm({ form: 'newInvite', validate })(NewInviteForm);
