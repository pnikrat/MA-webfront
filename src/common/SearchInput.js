// @flow
import React from 'react';
import type { FieldProps } from 'redux-form';
import { Form, Search } from 'semantic-ui-react';
import SearchResult from '../items/SearchResult';

type Props = {
  label?: string,
  type?: string,
  required?: boolean,
  results?: Array<Object>,
  open?: boolean,
  placeholder?: string,
  searchFieldValue: string,
  onSearchChange: (event: Object, data: Object) => void,
  onResultSelect: (event: Object, data: Object) => void,
} & FieldProps

const SearchInput = ({
  input, label, placeholder, required, results, onSearchChange, onResultSelect, searchFieldValue
}: Props) => (
  <div className="form-input">
    <Form.Field {...input} required={required}>
      <label htmlFor="name">{label}</label>
      <Search
        results={results}
        icon=""
        placeholder={placeholder}
        onSearchChange={onSearchChange}
        onResultSelect={onResultSelect}
        resultRenderer={SearchResult}
        value={searchFieldValue}
        noResultsMessage="No previous items found."
        noResultsDescription="A new item will be added"
        selectFirstResult
      />
    </Form.Field>
  </div>
);

export default SearchInput;
