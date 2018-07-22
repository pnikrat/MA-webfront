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
  lists: Object,
} & FormProps

class EditItemForm extends Component<Props> {
  props: Props

  listSelectOption = (list: Object) => (
    <option value={list.id} key={list.id}>
      {list.name}
    </option>
  )

  render() {
    const {
      error, handleSubmit, initialValues, lists
    } = this.props;
    const availableLists = lists.map(list => this.listSelectOption(list));
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <Field
          name="name"
          type="text"
          label="Nazwa"
          required
          component={Input}
          placeholder="Nazwa..."
        />
        <ItemsFormCore />
        { initialValues.aasm_state === 'missing' &&
          <Field
            name="list_id"
            label="Przynależna lista"
            control="select"
            component={Input}
          >
            {availableLists}
          </Field>
        }
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.modalsReducer.editItem.item,
  lists: state.listsReducer.lists,
});

const DecoratedEditItemForm = reduxForm({ form: 'editItem', validateItemForm })(EditItemForm);

export default connect(mapStateToProps, null)(DecoratedEditItemForm);
