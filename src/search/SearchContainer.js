// @flow
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SearchMenu from './SearchMenu';
import { GET } from '../state/constants';
import { apiCall } from '../services/apiActions';
import { setSearchResults, setSearchFieldValue, setSearchMenuVisibility } from './SearchActions';

type Props = {
  currentList: Object,
  displayResults: boolean,
  placeholder?: string,
  searchFieldValue: string,
  searchResults: Array<Object>,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
  handleItemsSearch: (Number, string) => void,
  handleSetSearchFieldValue: (string) => void,
  handleSetSearchMenuVisibility: (boolean) => void,
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

  debouncedItemsSearch: ((Number: any, string: any) => void) & _.Cancelable

  render() {
    const {
      placeholder, handleSetSearchMenuVisibility,
      onResultSelect, searchFieldValue, onItemDelete, displayResults, searchResults,
    } = this.props;
    return (
      <div>
        <Input
          className="search-relative"
          value={searchFieldValue}
          placeholder={placeholder}
          onChange={this.onSearchChange}
          // onBlur={() => handleSetSearchMenuVisibility(false)}
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
});

const mapDispatchToProps = dispatch => ({
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  handleSetSearchMenuVisibility: value => dispatch(setSearchMenuVisibility(value)),
  handleItemsSearch: (listId, query) => {
    dispatch(apiCall(`/lists/${listId}/items/?name=${query}`, setSearchResults, GET));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
