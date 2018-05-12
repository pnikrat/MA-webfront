// @flow
import React from 'react';
import type { FieldProps } from 'redux-form';
import { Form, Search } from 'semantic-ui-react';
import SearchResult from '../items/SearchResult';
import Input from './Input';

type Props = {
  label?: string,
  type?: string,
  required?: boolean,
  results?: Array<Object>,
  open?: boolean,
  placeholder?: string,
  onSearchChange: (event: Object, data: Object) => void,
  onResultSelect: (event: Object, data: Object) => void,
} & FieldProps

const SearchInput = ({
  input, label, placeholder, required, results, onSearchChange, onResultSelect
}: Props) => (
  <Form.Field {...input} required={required}>
    <label>{label}</label>
    <Search
      // input={<Input input={input} type="text" required={required} label={label} />}
      results={results}
      icon=""
      placeholder={placeholder}
      onSearchChange={onSearchChange}
      onResultSelect={onResultSelect}
      resultRenderer={SearchResult}
      noResultsMessage="No previous items found."
      noResultsDescription="A new item will be added"
      selectFirstResult
    />
  </Form.Field>
);

export default SearchInput;
