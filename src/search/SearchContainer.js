// @flow
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SearchMenu from './SearchMenu';
import { GET } from '../state/constants';
import { apiCall } from '../services/apiActions';
import { setSearchResults, setSearchFieldValue,
  setSearchMenuVisibility, changeSearchResultFocus } from './SearchActions';

type Props = {
  currentList: Object,
  displayResults: boolean,
  cursor: number,
  placeholder?: string,
  searchFieldValue: string,
  searchResults: Array<Object>,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
  handleItemsSearch: (Number, string) => void,
  handleSetSearchFieldValue: (string) => void,
  handleSetSearchMenuVisibility: (boolean) => void,
  handleSearchFocus: (number) => void,
}

class SearchContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleSetSearchFieldValue('');
    this.props.handleSetSearchMenuVisibility(false);
    this.debouncedItemsSearch = _.debounce(this.props.handleItemsSearch, 500);
  }

  onSearchChange = (event, data) => {
    const listId = this.props.currentList.id;
    const { value } = data;
    this.props.handleSetSearchFieldValue(value);
    this.debouncedItemsSearch(listId, value);
  }

  checkKeyAndFireAction = (e: Object) => {
    switch (e.keyCode) {
      case 40: // arrow down
        if (this.props.cursor < this.props.searchResults.length - 1) {
          this.props.handleSearchFocus(this.props.cursor + 1);
        }
        break;
      case 38: // arrow up
        if (this.props.cursor > 0) {
          this.props.handleSearchFocus(this.props.cursor - 1);
        }
        break;
      default:
        break;
    }
  }

  handleInputFocusOut = (e: Object) => {
    if (e.relatedTarget !== undefined && e.relatedTarget !== null) {
      if (e.relatedTarget.classList.contains('unblurrable')) {
        return;
      }
    }
    this.props.handleSetSearchMenuVisibility(false);
  }

  debouncedItemsSearch: ((Number: any, string: any) => void) & _.Cancelable

  render() {
    const {
      placeholder, onResultSelect, searchFieldValue,
      onItemDelete, displayResults, searchResults,
    } = this.props;
    return (
      <div>
        <Input
          className="search-relative"
          value={searchFieldValue}
          placeholder={placeholder}
          onChange={this.onSearchChange}
          onBlur={e => this.handleInputFocusOut(e)}
          onKeyDown={e => this.checkKeyAndFireAction(e)}
        />
        { displayResults &&
          <SearchMenu
            results={searchResults}
            onResultSelect={onResultSelect}
            onItemDelete={onItemDelete}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.itemsReducer.currentList,
  searchResults: state.searchReducer.results,
  displayResults: state.searchReducer.open,
  searchFieldValue: state.searchReducer.value,
  cursor: state.searchReducer.cursor,
});

const mapDispatchToProps = dispatch => ({
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  handleSetSearchMenuVisibility: value => dispatch(setSearchMenuVisibility(value)),
  handleItemsSearch: (listId, query) => {
    dispatch(apiCall(`/lists/${listId}/items/?name=${query}`, setSearchResults, GET));
  },
  handleSearchFocus: value => dispatch(changeSearchResultFocus(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
