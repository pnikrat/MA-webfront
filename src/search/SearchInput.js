// @flow
import React, { Component } from 'react';
import type { FieldProps } from 'redux-form';
import { Form } from 'semantic-ui-react';
import SearchResult from './SearchResult';
import SearchContainer from './SearchContainer';

type Props = {
  label?: string,
  required?: boolean,
  results: Array<Object>,
  open?: boolean,
  placeholder?: string,
  searchFieldValue: string,
  onSearchChange: (event: Object, data: Object) => void,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
} & FieldProps

class SearchInput extends Component<Props> {
  render() {
    const {
      input, label, placeholder, required, results, onSearchChange,
      onResultSelect, searchFieldValue, onItemDelete, open
    } = this.props;
    return (
      <div className="form-input">
        <Form.Field {...input} required={required}>
          <label htmlFor="name">{label}</label>
          <SearchContainer
            open={open}
            onItemDelete={onItemDelete}
            results={results}
            placeholder={placeholder}
            onSearchChange={onSearchChange}
            onResultSelect={onResultSelect}
            resultRenderer={SearchResult}
            searchFieldValue={searchFieldValue}
          />
        </Form.Field>
      </div>
    );
  }
}

export default SearchInput;
