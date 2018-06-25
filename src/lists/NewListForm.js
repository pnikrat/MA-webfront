// @flow
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import ListsFormCore from './ListsFormCore';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class NewListForm extends Component<Props> {
  props: Props

  render() {
    const {
      error, submitting, handleSubmit,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <ListsFormCore placeholder="My new shopping list" />
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

const validateListForm = (values: Object) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

const DecoratedNewListForm = reduxForm({ form: 'newList', validateListForm })(NewListForm);
export {
  DecoratedNewListForm, validateListForm
};
