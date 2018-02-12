// @flow
import React from 'react';
import type { FieldProps } from 'redux-form';

type Props = {
  label?: string,
  type?: string,
  placeholder?: string,
} & FieldProps

const Input = ({
  input, label, type, placeholder, meta
}: Props) => (
  <div>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
    />
    {meta.touched && meta.error && <div>{meta.error}</div>}
  </div>
);

export default Input;
