// @flow
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import GroupsFormCore from './GroupsFormCore';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class NewGroupForm extends Component<Props> {
  props: Props

  render() {
    return (
      <GroupsFormCore
        placeholder="Wprowadź nazwę swojej nowej grupy"
        submitText="Stwórz"
        {...this.props}
      />
    );
  }
}

const validateGroupForm = (values: Object) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Pole wymagane';
  }
  return errors;
};

const DecoratedNewGroupForm = reduxForm({ form: 'newGroup', validateGroupForm })(NewGroupForm);
export {
  DecoratedNewGroupForm, validateGroupForm
};
