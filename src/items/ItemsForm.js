// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';
import SearchInput from '../search/SearchInput';

type Props = {
  onSubmit: (data: Object) => void,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
  name?: string,
  quantity?: number,
  unit?: string,
  price?: number,
} & FormProps

class ItemsForm extends Component<Props> {
  props: Props

  render() {
    const {
      error, submitting, handleSubmit, onResultSelect, onItemDelete,
      name, quantity, unit, price,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="name"
          type="text"
          label="Item name"
          value={name}
          required
          component={SearchInput}
          placeholder="Type to search previous or add new..."
          onResultSelect={onResultSelect}
          onItemDelete={onItemDelete}
        />
        <div className="flexed">
          <Field
            name="quantity"
            type="number"
            label="Quantity"
            component={Input}
            value={quantity}
          />
          <Field
            name="unit"
            type="text"
            label="Unit"
            component={Input}
            placeholder="Pieces, bottles, etc..."
            value={unit}
          />
          <Field
            name="price"
            parse={value => Number(value)}
            type="number"
            label="Price"
            min="0.00"
            step="0.01"
            component={Input}
            value={price}
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
