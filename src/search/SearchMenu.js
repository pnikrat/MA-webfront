// @flow
import React, { Component } from 'react';
import SearchResult from './SearchResult';

type Props = {
  results: Array<Object>,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
}

class SearchMenu extends Component<Props> {
  singleResult = (result: Object) => (
    <SearchResult
      key={result.id}
      result={result}
      onResultSelect={this.props.onResultSelect}
      onItemDelete={this.props.onItemDelete}
    />
  )

  render() {
    const {
      results
    } = this.props;
    return (
      <div className="search-absolute">
        { results && results.map(result => this.singleResult(result)) }
        { results.length === 0 &&
          <SearchResult
            result={{ id: -1 }}
            title="No previous items found."
            description="A new item will be added"
          />
        }
      </div>
    );
  }
}

export default SearchMenu;
