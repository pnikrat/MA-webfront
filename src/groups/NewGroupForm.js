// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class NewGroupForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="name"
          type="text"
          label="Group name"
          required
          component={Input}
          placeholder="Enter the name of your new group"
        />
        <Form.Button
          type="submit"
          disabled={submitting}
          color="blue"
        >
          {submitting ? 'Submitting...' : 'Create'}
        </Form.Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({ form: 'newGroup', validate })(NewGroupForm);
