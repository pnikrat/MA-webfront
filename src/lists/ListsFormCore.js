// @flow
import React from 'react';
import { Field } from 'redux-form';
import Input from '../common/Input';

type Props = {
  placeholder?: string,
}

const ListsFormCore = ({ placeholder }: Props) => (
  <Field
    name="name"
    type="text"
    label="Shopping list name"
    required
    component={Input}
    placeholder={placeholder}
  />
);

export default ListsFormCore;
