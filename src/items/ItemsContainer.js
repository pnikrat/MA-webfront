// @flow
import React, { Component } from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, toggleItem,
  setCurrentListAndFetchItems, setSearchResults } from './ItemsActions';
import Items from './Items';
import ItemsForm from './ItemsForm';
import '../styles/items.css';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  searchResults: Array<Object>,
  displayResults: boolean,
  handleSetCurrentList: (Number) => void,
  clearForm: () => void,
  handleItemAdd: (Number, Object) => void,
  handleItemDelete: (Number, Number) => void,
  handleItemToggle: (Number, Number, Object) => void,
  handleItemsSearch: (Number, String) => void,
}

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.match.params.id;
    this.props.handleSetCurrentList(listId);
  }

  onItemDelete = (id) => {
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
    this.props.handleItemsSearch(listId, value);
  }

  onResultSelect = (event, data) => {
    this.props.clearForm();
    const listId = this.props.currentList.id;
    const { id } = data.result;
    const stateParams = { state: 'to_buy' };
    this.props.handleItemToggle(listId, id, stateParams);
  }

  handleItemAdd = (data) => {
    this.props.clearForm();
    const listId = this.props.currentList.id;
    this.props.handleItemAdd(listId, data);
  }

  props: Props

  render() {
    const {
      currentList, items, searchResults, displayResults
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
            />
          </Segment>
        </Container>
        {items.length > 0 &&
          <Items
            items={items}
            onItemDelete={this.onItemDelete}
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
