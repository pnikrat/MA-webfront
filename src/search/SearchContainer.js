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
  onBlur: (event: Object) => void,
}

class SearchContainer extends Component<Props> {
  checkKeyAndFireAction = (e: Object) => {
    switch (e.keyCode) {
      case 40: // arrow down
        // decrease selected index
        break;
      case 38: // arrow up
        // increase selected index
        break;
      case 13: // enter
        // onResultSelect with index of selection (??)
        break;
      default:
        break;
    }
  }

  render() {
    const {
      placeholder, results, onSearchChange,
      onResultSelect, searchFieldValue, onItemDelete, open, onBlur
    } = this.props;
    return (
      <div>
        <Input
          className="search-relative"
          value={searchFieldValue}
          placeholder={placeholder}
          onChange={onSearchChange}
          onBlur={onBlur}
          onKeyDown={e => this.checkKeyAndFireAction(e)}
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
