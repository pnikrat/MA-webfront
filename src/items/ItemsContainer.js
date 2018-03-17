// @flow
import React, { Component } from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import api from '../services/api';
import { setCurrentList, setItems, addItem, removeItem, toggleItem } from './ItemsActions';
import Items from './Items';
import ItemsForm from './ItemsForm';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  handleSetCurrentList: (Object) => void,
  handleItemsFetch: (Object) => void,
  clearForm: () => void,
  handleItemAdd: (Object) => void,
  handleItemDelete: (Number) => void,
  handleItemToggle: (Number) => void,
}

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.match.params.id;
    api.get(`/lists/${listId}`).then((response) => {
      this.props.handleSetCurrentList(response.data);
      return api.get(`/lists/${listId}/items`).then(resp =>
        this.props.handleItemsFetch(resp.data));
    });
  }

  onItemDelete = (id) => {
    const listId = this.props.currentList.id;
    api.delete(`/lists/${listId}/items/${String(id)}`).then(() =>
      this.props.handleItemDelete(id));
  }

  onItemToggle = (item) => {
    const listId = this.props.currentList.id;
    const { id } = item;
    const event = item.aasm_state === 'to_buy' ? 'buy' : 'cancel_buy';
    const data = { state: event };
    api.put(`/lists/${listId}/items/${id}/toggle`, data).then(() =>
      this.props.handleItemToggle(id));
  }

  handleItemAdd = (data) => {
    this.props.clearForm();
    const listId = this.props.currentList.id;
    api.post(`/lists/${listId}/items`, data).then(response =>
      this.props.handleItemAdd(response.data));
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
            onItemToggle={this.onItemToggle}
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
  handleSetCurrentList: list => dispatch(setCurrentList(list)),
  handleItemsFetch: items => dispatch(setItems(items)),
  clearForm: () => dispatch(reset('items')),
  handleItemAdd: item => dispatch(addItem(item)),
  handleItemDelete: id => dispatch(removeItem(id)),
  handleItemToggle: id => dispatch(toggleItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
