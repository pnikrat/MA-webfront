// @flow
import React, { Component } from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import _ from 'lodash';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, toggleItem, setCurrentListAndFetchItems } from './ItemsActions';
import {
  setSearchResults, setSearchFieldValue, setSearchMenuVisibility
} from '../search/SearchActions';
import Items from './Items';
import ItemsForm from './ItemsForm';
import '../styles/items.css';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  searchResults: Array<Object>,
  displayResults: boolean,
  searchFieldValue: string,
  handleSetCurrentList: (Number) => void,
  clearForm: () => void,
  handleItemAdd: (Number, Object) => void,
  handleItemDelete: (Number, Number) => void,
  handleItemToggle: (Number, Number, Object) => void,
  handleItemsSearch: (Number, string) => void,
  handleSetSearchFieldValue: (string) => void,
  handleSetSearchMenuVisibility: (boolean) => void,
}

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.match.params.id;
    this.props.handleSetCurrentList(listId);
    this.props.handleSetSearchFieldValue('');
    this.props.handleSetSearchMenuVisibility(false);
    this.debouncedItemsSearch = _.debounce(this.props.handleItemsSearch, 500);
  }

  onItemDelete = (id) => {
    this.props.handleSetSearchFieldValue('');
    this.props.clearForm();
    const listId = this.props.currentList.id;
    this.props.handleItemDelete(listId, id);
  }

  onItemStateChange = (item, desiredState) => {
    const listId = this.props.currentList.id;
    const { id } = item;
    const data = { state: desiredState };
    this.props.handleItemToggle(listId, id, data);
  }

  onSearchChange = (event, data) => {
    const listId = this.props.currentList.id;
    const { value } = data;
    this.props.handleSetSearchFieldValue(value);
    this.debouncedItemsSearch(listId, value);
  }

  onResultSelect = (data) => {
    this.props.handleSetSearchFieldValue('');
    this.props.clearForm();
    const listId = this.props.currentList.id;
    const { id } = data;
    const stateParams = { state: 'to_buy' };
    this.props.handleItemToggle(listId, id, stateParams);
  }

  handleItemAdd = (data) => {
    this.props.handleSetSearchFieldValue('');
    this.props.clearForm();
    const listId = this.props.currentList.id;
    this.props.handleItemAdd(listId, data);
  }

  props: Props
  debouncedItemsSearch: ((Number: any, string: any) => void) & _.Cancelable

  render() {
    const {
      currentList, items, searchResults, displayResults, searchFieldValue,
      handleSetSearchMenuVisibility
    } = this.props;
    return (
      <Container>
        <Header as="h2">
          <Icon name="shopping cart" />
          <Header.Content>
            {currentList && currentList.name}
          </Header.Content>
        </Header>
        <Container className="form-container">
          <Segment>
            <Header as="h3" className="with-divider">Add shopping items</Header>
            <ItemsForm
              onSubmit={this.handleItemAdd}
              onSearchChange={this.onSearchChange}
              onResultSelect={this.onResultSelect}
              results={searchResults}
              open={displayResults}
              onItemDelete={this.onItemDelete}
              searchFieldValue={searchFieldValue}
              onBlur={() => handleSetSearchMenuVisibility(false)}
            />
          </Segment>
        </Container>
        {items.length > 0 &&
          <Items
            items={items}
            onItemStateChange={this.onItemStateChange}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  currentList: state.itemsReducer.currentList,
  searchResults: state.searchReducer.results,
  displayResults: state.searchReducer.open,
  searchFieldValue: state.searchReducer.value,
});

const mapDispatchToProps = dispatch => ({
  handleSetCurrentList: id => dispatch(apiCall(`/lists/${id}`, setCurrentListAndFetchItems, GET)),
  clearForm: () => dispatch(reset('items')),
  handleItemAdd: (listId, data) => dispatch(apiCall(`/lists/${listId}/items`, addItem, POST, data)),
  handleItemDelete: (listId, id) => {
    dispatch(apiCall(`/lists/${listId}/items/${String(id)}`, () => removeItem(id), DELETE));
  },
  handleItemToggle: (listId, id, data) => {
    dispatch(apiCall(`/lists/${listId}/items/${id}`, toggleItem, PUT, data));
  },
  handleItemsSearch: (listId, query) => {
    dispatch(apiCall(`/lists/${listId}/items/?name=${query}`, setSearchResults, GET));
  },
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  handleSetSearchMenuVisibility: value => dispatch(setSearchMenuVisibility(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
