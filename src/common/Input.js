// @flow
import React from 'react';
import type { FieldProps } from 'redux-form';
import { Form, Label } from 'semantic-ui-react';

type Props = {
  min?: number,
  step?: number,
  label?: string,
  type?: string,
  required?: boolean,
  placeholder?: string,
} & FieldProps

const Input = ({
  input, label, type, placeholder, required, meta, min, step
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
      error={meta && meta.submitFailed && meta.error && true}
      placeholder={placeholder}
    />
    { meta && meta.submitFailed && meta.error &&
    <Label basic pointing="above">{meta.error}</Label> }
  </div>
);

export default Input;
