// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ItemsFormCore from './ItemsFormCore';
import Input from '../common/Input';
import { validateItemForm } from './NewItemForm';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class EditItemForm extends Component<Props> {
  props: Props

  render() {
    const {
      error, handleSubmit,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="name"
          type="text"
          label="Item name"
          required
          component={Input}
          placeholder="Item name..."
        />
        <ItemsFormCore />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.modalsReducer.editItems.item,
});

const DecoratedEditItemForm = reduxForm({ form: 'editItem', validateItemForm })(EditItemForm);

export default connect(mapStateToProps, null)(DecoratedEditItemForm);
