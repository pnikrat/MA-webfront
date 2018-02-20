// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Container, Form, Header, Message, Segment } from 'semantic-ui-react';
import Input from '../common/Input';
import '../styles/lists.css';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class ListsForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <Container className="form-container">
        <Header as="h5" attached="top">Add shopping list</Header>
        <Segment attached padded color="blue">
          <Form onSubmit={handleSubmit}>
            { error && <Message negative>{error}</Message> }
            <Field
              name="name"
              type="text"
              label="Shopping list name"
              required
              component={Input}
              placeholder="My new shopping list"
              className="form-control"
            />
            <Form.Button
              type="submit"
              disabled={submitting}
              color="blue"
            >
              {submitting ? 'Submitting...' : 'Add'}
            </Form.Button>
          </Form>
        </Segment>
      </Container>
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

export default reduxForm({ form: 'lists', validate })(ListsForm);
