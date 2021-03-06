// @flow
import React from 'react';
import { Field } from 'redux-form';
import Input from '../common/Input';

const ItemsFormCore = () => (
  <div className="flexed no-flex-wrap">
    <Field
      name="quantity"
      parse={value => Number(value)}
      type="number"
      label="Ilość"
      min="0.00"
      step="0.01"
      component={Input}
    />
    <Field
      name="unit"
      type="text"
      label="Jednostka"
      component={Input}
      placeholder="Sztuki, butelki, kilogramy, itp..."
    />
    <Field
      name="price"
      parse={value => Number(value)}
      type="number"
      label="Cena za jednostkę"
      min="0.00"
      step="0.01"
      component={Input}
    />
  </div>
);

export default ItemsFormCore;
