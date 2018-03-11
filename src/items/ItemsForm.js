// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Container, Form, Header, Message, Segment } from 'semantic-ui-react';
import Input from '../common/Input';
import '../styles/items.css';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class ItemsForm extends Component<Props> {
  props: Props

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <Container>
        <Header as="h5" attached="top">Add shopping items</Header>
        <Segment attached padded color="blue">
          <Form onSubmit={handleSubmit}>
            { error && <Message negative>{error}</Message> }
            <Field
              name="name"
              type="text"
              label="Item name"
              required
              component={Input}
              placeholder="Type any item..."
            />
            <div className="flexed">
              <Field
                name="quantity"
                type="number"
                label="Quantity"
                component={Input}
              />
              <Field
                name="unit"
                type="text"
                label="Unit"
                component={Input}
                placeholder="Pieces, bottles, etc..."
              />
              <Field
                name="price"
                parse={value => Number(value)}
                type="number"
                label="Price"
                min="0.00"
                step="0.01"
                component={Input}
              />
            </div>
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

export default reduxForm({ form: 'items', validate })(ItemsForm);
