// @flow
import React, { Component } from 'react';
import SearchResult from './SearchResult';

type Props = {
  currentList: Object,
  results: Array<Object>,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
}

class SearchMenu extends Component<Props> {
  singleResult = (result: Object, isCurrent: boolean) => (
    <SearchResult
      key={result.id}
      result={result}
      isFromCurrentList={isCurrent}
      onResultSelect={this.props.onResultSelect}
      onItemDelete={this.props.onItemDelete}
    />
  )

  render() {
    const {
      results, currentList,
    } = this.props;

    const currentListFilter = (x: Object) => x.list_id === currentList.id;
    const otherListFilter = (x: Object) => x.list_id !== currentList.id;

    const otherListResults = results.filter(otherListFilter);

    return (
      <div className="search-absolute">
        {results &&
          <div>
            { results.filter(currentListFilter).map(result => this.singleResult(result, true)) }
            { otherListResults.length > 0 && <div className="search-divider" /> }
            { otherListResults.map(result => this.singleResult(result, false)) }
          </div>
        }
      </div>
    );
  }
}

export default SearchMenu;
