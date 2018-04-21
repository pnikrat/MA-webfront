// @flow
import React, { Component } from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, toggleItem, setCurrentListAndFetchItems } from './ItemsActions';
import Items from './Items';
import ItemsForm from './ItemsForm';
import '../styles/items.css';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  handleSetCurrentList: (Number) => void,
  clearForm: () => void,
  handleItemAdd: (Number, Object) => void,
  handleItemDelete: (Number, Number) => void,
  handleItemToggle: (Number, Number, Object) => void,
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

  handleItemAdd = (data) => {
    this.props.clearForm();
    const listId = this.props.currentList.id;
    this.props.handleItemAdd(listId, data);
  }

  props: Props

  render() {
    return (
      <Container>
        <Header as="h2">
          <Icon name="shopping cart" />
          <Header.Content>
            {this.props.currentList && this.props.currentList.name}
          </Header.Content>
        </Header>
        <Container className="form-container">
          <Segment>
            <Header as="h3" className="with-divider">Add shopping items</Header>
            <ItemsForm onSubmit={this.handleItemAdd} />
          </Segment>
        </Container>
        {this.props.items.length > 0 &&
          <Items
            items={this.props.items}
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
  currentList: state.itemsReducer.currentList
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
