// @flow
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import SearchMenu from './SearchMenu';

type Props = {
  results: Array<Object>,
  open?: boolean,
  placeholder?: string,
  searchFieldValue: string,
  onSearchChange: (event: Object, data: Object) => void,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
}

class SearchContainer extends Component<Props> {
  render() {
    const {
      placeholder, results, onSearchChange,
      onResultSelect, searchFieldValue, onItemDelete, open
    } = this.props;
    return (
      <div>
        <Input
          className="search-relative"
          value={searchFieldValue}
          placeholder={placeholder}
          onChange={onSearchChange}
        />
        { open &&
          <SearchMenu
            results={results}
            onResultSelect={onResultSelect}
            onItemDelete={onItemDelete}
          />
        }
      </div>
    );
  }
}

export default SearchContainer;
