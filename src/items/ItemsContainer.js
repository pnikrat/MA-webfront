// @flow
import React, { Component } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import api from '../services/api';
import { setCurrentList, setItems, addItem } from './ItemsActions';
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
        <ItemsForm onSubmit={this.handleItemAdd} />
        {this.props.items.length > 0 &&
          <Items
            items={this.props.items}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    items: state.itemsReducer.items,
    currentList: state.itemsReducer.currentList,
  }
);

const mapDispatchToProps = dispatch => (
  {
    handleSetCurrentList: list => dispatch(setCurrentList(list)),
    handleItemsFetch: items => dispatch(setItems(items)),
    clearForm: () => dispatch(reset('items')),
    handleItemAdd: item => dispatch(addItem(item)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
