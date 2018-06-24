// @flow
import React from 'react';
import { Field } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';

type Props = {
  onSubmit: (data: Object) => void,
  placeholder?: string,
  submitText: string,
} & FormProps

const GroupsFormCore = ({
  error, submitting, handleSubmit, placeholder, submitText
}: Props) => (
  <Form onSubmit={handleSubmit}>
    { error && <Message negative>{error}</Message> }
    <Field
      name="name"
      type="text"
      label="Group name"
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

export default GroupsFormCore;
