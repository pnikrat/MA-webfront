// @flow
import React, { Component } from 'react';
import type { FieldProps } from 'redux-form';
import { Form } from 'semantic-ui-react';
import SearchResult from './SearchResult';
import SearchContainer from './SearchContainer';

type Props = {
  label?: string,
  required?: boolean,
  placeholder?: string,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
} & FieldProps

class SearchInput extends Component<Props> {
  render() {
    const {
      input, label, placeholder, required, onResultSelect, onItemDelete
    } = this.props;
    return (
      <div className="form-input">
        <Form.Field {...input} required={required}>
          <label htmlFor="name">{label}</label>
          <SearchContainer
            onItemDelete={onItemDelete}
            placeholder={placeholder}
            onResultSelect={onResultSelect}
            resultRenderer={SearchResult}
          />
        </Form.Field>
      </div>
    );
  }
}

export default SearchInput;
