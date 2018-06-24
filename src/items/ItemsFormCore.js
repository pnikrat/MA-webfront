// @flow
import React from 'react';
import { Field } from 'redux-form';
import Input from '../common/Input';

const ItemsFormCore = () => (
  <div className="flexed no-flex-wrap">
    <Field
      name="quantity"
      type="number"
      label="Quantity"
      component={Input}
    />
    <Field
      name="unit"
      type="text"
      label="Unit"
      component={Input}
      placeholder="Pieces, bottles, etc..."
    />
    <Field
      name="price"
      parse={value => Number(value)}
      type="number"
      label="Price"
      min="0.00"
      step="0.01"
      component={Input}
    />
  </div>
);

export default ItemsFormCore;
