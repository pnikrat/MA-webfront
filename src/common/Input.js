// @flow
import React from 'react';
import type { FieldProps } from 'redux-form';
import { Form, Label } from 'semantic-ui-react';
import '../styles/common.css';

type Props = {
  withoutErrors?: boolean,
  min?: number,
  step?: number,
  label?: string,
  type?: string,
  required?: boolean,
  placeholder?: string,
} & FieldProps

const Input = ({
  withoutErrors, input, label, type, placeholder, required, meta, min, step
}: Props) => (
  <div className="form-input">
    <Form.Field
      {...input}
      control="input"
      type={type}
      label={label}
      min={min}
      step={step}
      required={required}
      error={meta.touched && meta.error && true}
      placeholder={placeholder}
      className="form-control"
    />
    {!withoutErrors && meta.touched && meta.error &&
    <Label basic pointing="above">{meta.error}</Label>}
  </div>
);

export default Input;
