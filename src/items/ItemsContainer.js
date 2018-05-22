// @flow
import React, { Component } from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, toggleItem, setCurrentListAndFetchItems } from './ItemsActions';
import { setSearchFieldValue } from '../search/SearchActions';
import Items from './Items';
import ItemsForm from './ItemsForm';
import '../styles/items.css';
import { openEditItemModal, closeModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  isEditItemModalOpen: boolean,
  editItem: Object,
  handleSetCurrentList: (Number) => void,
  clearForm: () => void,
  handleItemAdd: (Number, Object) => void,
  handleItemDelete: (Number, Number) => void,
  handleItemToggle: (Number, Number, Object) => void,
  handleSetSearchFieldValue: (string) => void,
  openEditModal: (Object) => void,
  closeEditItemModal: () => void,
}

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.match.params.id;
    this.props.handleSetCurrentList(listId);
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

  onResultSelect = (data) => {
    this.props.handleSetSearchFieldValue('');
    this.props.clearForm();
    const listId = this.props.currentList.id;
    const { id } = data;
    const stateParams = { state: 'to_buy' };
    this.props.handleItemToggle(listId, id, stateParams);
  }

  onItemEdit = (data) => {
    return data;
  }

  handleItemAdd = (data) => {
    this.props.handleSetSearchFieldValue('');
    this.props.clearForm();
    const listId = this.props.currentList.id;
    this.props.handleItemAdd(listId, data);
  }

  props: Props

  render() {
    const {
      currentList, items, openEditModal, closeEditItemModal, isEditItemModalOpen, editItem,
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
              onResultSelect={this.onResultSelect}
              onItemDelete={this.onItemDelete}
            />
          </Segment>
        </Container>
        {items.length > 0 &&
          <Items
            items={items}
            onItemStateChange={this.onItemStateChange}
            openEditModal={openEditModal}
          />
        }
        <ConfirmationModal
          isOpen={isEditItemModalOpen}
          onClose={closeEditItemModal}
          objectId={editItem}
          onConfirm={this.onItemEdit}
          header="Edit item"
          negativeButtonText="Discard changes"
          positiveButtonText="Accept changes"
        >
          <ItemsForm {...editItem} />
        </ConfirmationModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  currentList: state.itemsReducer.currentList,
  isEditItemModalOpen: state.modalsReducer.editItems.isOpen,
  editItem: state.modalsReducer.editItems.item,
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
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  openEditModal: item => dispatch(openEditItemModal(item)),
  closeEditItemModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
