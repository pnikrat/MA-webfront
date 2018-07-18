// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import ItemsFormCore from './ItemsFormCore';
import SearchInput from '../search/SearchInput';


type Props = {
  onSubmit: (data: Object) => void,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
  name?: string,
  quantity: number,
  unit: string,
  price: number,
} & FormProps

class NewItemForm extends Component<Props> {
  props: Props

  render() {
    const {
      error, submitting, handleSubmit, onResultSelect, onItemDelete,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="name"
          type="text"
          label="Nazwa"
          required
          component={SearchInput}
          placeholder="Zacznij wpisywać, aby przeszukać poprzednio dodane rzeczy lub dodać nowe..."
          onResultSelect={onResultSelect}
          onItemDelete={onItemDelete}
        />
        <ItemsFormCore />
        <Form.Button
          type="submit"
          disabled={submitting}
          color="blue"
        >
          {submitting ? 'Wysyłanie...' : 'Dodaj'}
        </Form.Button>
      </Form>
    );
  }
}

const validateItemForm = (values: Object) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Pole wymagane';
  }
  return errors;
};

const DecoratedNewItemForm = reduxForm({ form: 'newItem', validateItemForm })(NewItemForm);
export {
  DecoratedNewItemForm, validateItemForm
};
