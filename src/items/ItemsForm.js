// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import Input from '../common/Input';
import SearchInput from '../common/SearchInput';

type Props = {
  onSubmit: (data: Object) => void,
  onSearchChange: (event: Object, data: Object) => void,
  onResultSelect: (event: Object, data: Object) => void,
  results: Array<Object>,
  open: boolean,
  searchFieldValue: string,
} & FormProps

class ItemsForm extends Component<Props> {
  props: Props

  render() {
    const {
      error, submitting, handleSubmit, onSearchChange, results, open,
      onResultSelect, searchFieldValue
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="name"
          type="text"
          label="Item name"
          required
          component={SearchInput}
          results={results}
          open={open}
          onSearchChange={onSearchChange}
          onResultSelect={onResultSelect}
          searchFieldValue={searchFieldValue}
          placeholder="Type to search previous or add new..."
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
