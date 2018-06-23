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
        placeholder="Enter the name of your new group"
        submitText="Create"
        {...this.props}
      />
    );
  }
}

const validateGroupForm = (values: Object) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

const DecoratedNewGroupForm = reduxForm({ form: 'newGroup', validateGroupForm })(NewGroupForm);
export {
  DecoratedNewGroupForm, validateGroupForm
};
