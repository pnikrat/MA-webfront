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
    label="Nazwa listy zakupów"
    required
    component={Input}
    placeholder={placeholder}
  />
);

export default ListsFormCore;
