// @flow
import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { addItem, removeItem, editItem, setCurrentListAndFetchItems,
  massUpdateItems, massMoveItems } from './ItemsActions';
import { setSearchFieldValue, setSearchMenuVisibility } from '../search/SearchActions';
import Items from './Items';
import { DecoratedNewItemForm as NewItemForm } from './NewItemForm';
import EditItemForm from './EditItemForm';
import '../styles/items.css';
import { openEditItemModal, closeModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';
import ModalSubmitButton from '../common/ModalSubmitButton';
import ModuleTitle from '../common/ModuleTitle';
import ListSubscription from '../websockets/ListSubscription';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  lists: Object,
  isEditItemModalOpen: boolean,
  isRemoveBoughtDisabled: boolean,
  isMoveMissingDisabled: boolean,
  rawDispatch: (Object) => void,
  handleSetCurrentList: (Number) => void,
  clearForm: () => void,
  handleItemAdd: (Number, Object) => void,
  handleItemDelete: (Number, Number) => void,
  handleItemEdit: (Number, Number, Object) => void,
  handleSetSearchFieldValue: (string) => void,
  handleSetSearchMenuVisibility: (boolean) => void,
  openEditModal: (Object) => void,
  closeEditModal: () => void,
  handleRemoveBoughtItems: (Number, Object) => void,
  handleMoveMissingItems: (Number, Object) => void,
}

const EditItemModal = ConfirmationModal(ModalSubmitButton);
const byState = (x: Object, state: string) => x.filter(i => i.aasm_state === state);


class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.match.params.id;
    this.props.handleSetCurrentList(listId);

    this.listChannel = new ListSubscription(listId, this.props.rawDispatch);
    this.listChannel.subscribe();
  }

  componentWillUnmount = () => {
    this.listChannel.unsubscribe();
  }

  onItemDelete = (id) => {
    this.resetSearch();
    const listId = this.props.currentList.id;
    this.props.handleItemDelete(listId, id);
  }

  onItemStateChange = (item, desiredState) => {
    const listId = this.props.currentList.id;
    const { id } = item;
    const data = { state: desiredState };
    this.props.handleItemEdit(listId, id, data);
  }

  onResultSelect = (data) => {
    this.resetSearch();
    const listId = this.props.currentList.id;
    const { id } = data;
    const stateParams = { state: 'to_buy' };
    this.props.handleItemEdit(listId, id, stateParams);
  }

  onItemEdit = (data) => {
    this.props.closeEditModal();
    const listId = this.props.currentList.id;
    const { id } = data;
    let modifiedData;
    if (data.list_id !== listId) {
      modifiedData = { ...data, target_list: data.list_id, state: 'to_buy' };
    }
    this.props.handleItemEdit(listId, id, modifiedData || data);
  }

  resetSearch = () => {
    this.props.handleSetSearchFieldValue('');
    this.props.handleSetSearchMenuVisibility(false);
    this.props.clearForm();
  }

  removeBoughtItems = () => {
    const boughtItemsIds = byState(this.props.items, 'bought').map(i => i.id);
    const params = { ids: boughtItemsIds, state: 'deleted' };
    const listId = this.props.currentList.id;
    this.props.handleRemoveBoughtItems(listId, params);
  }

  moveMissingItems = (targetListId) => {
    const missingItemsIds = byState(this.props.items, 'missing').map(i => i.id);
    const params = { ids: missingItemsIds, target_list: targetListId, state: 'to_buy' };
    const listId = this.props.currentList.id;
    this.props.handleMoveMissingItems(listId, params);
  }

  handleItemAdd = (data) => {
    this.resetSearch();
    const listId = this.props.currentList.id;
    const existingItem = this.props.items.filter(
      i => i.name.localeCompare(data.name, 'en', { sensitivity: 'base' }) === 0);
    if (existingItem.length > 0) {
      const item = existingItem[0];
      if (item.aasm_state === 'deleted') {
        data.state = 'to_buy';
      }
      this.props.handleItemEdit(listId, item.id, data);
    } else {
      this.props.handleItemAdd(listId, data);
    }
  }

  props: Props
  listChannel: ListSubscription

  render() {
    const {
      currentList, items, openEditModal, closeEditModal, isEditItemModalOpen,
      isRemoveBoughtDisabled, lists, isMoveMissingDisabled,
    } = this.props;
    return (
      <Container>
        <ModuleTitle iconName="shopping cart" className="medium-bottom-margin">
          {currentList && currentList.name}
        </ModuleTitle>
        <Container className="form-container">
          <Segment>
            <Header as="h3" className="with-divider" data-cy="add-item-form-header">Dodaj rzeczy do kupienia</Header>
            <NewItemForm
              onSubmit={this.handleItemAdd}
              onResultSelect={this.onResultSelect}
              onItemDelete={this.onItemDelete}
            />
          </Segment>
        </Container>
        {items.length > 0 &&
          <Items
            items={items}
            lists={lists}
            onItemStateChange={this.onItemStateChange}
            openEditModal={openEditModal}
            isRemoveBoughtDisabled={isRemoveBoughtDisabled}
            removeBoughtItems={this.removeBoughtItems}
            isMoveMissingDisabled={isMoveMissingDisabled}
            moveMissingItems={this.moveMissingItems}
            currentList={currentList}
          />
        }
        <EditItemModal
          isOpen={isEditItemModalOpen}
          onClose={closeEditModal}
          formReduxName="editItem"
          header="Edytuj rzecz"
          negativeButtonText="Odrzuć zmiany"
        >
          <EditItemForm onSubmit={this.onItemEdit} />
        </EditItemModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  lists: state.listsReducer.lists,
  currentList: state.itemsReducer.currentList,
  isEditItemModalOpen: state.modalsReducer.editItem.isOpen,
  isRemoveBoughtDisabled: byState(state.itemsReducer.items, 'bought').length === 0,
  isMoveMissingDisabled: byState(state.itemsReducer.items, 'missing').length === 0,
});

const mapDispatchToProps = dispatch => ({
  rawDispatch: dispatch,
  handleSetCurrentList: id => dispatch(apiCall(`/lists/${id}`, setCurrentListAndFetchItems, GET)),
  clearForm: () => dispatch(reset('newItem')),
  handleItemAdd: (listId, data) => dispatch(apiCall(`/lists/${listId}/items`, addItem, POST, data)),
  handleItemDelete: (listId, id) => {
    dispatch(apiCall(`/lists/${listId}/items/${String(id)}`, () => removeItem(id), DELETE));
  },
  handleItemEdit: (listId, id, data) => {
    dispatch(apiCall(`/lists/${listId}/items/${id}`, editItem, PUT, data));
  },
  handleSetSearchFieldValue: value => dispatch(setSearchFieldValue(value)),
  handleSetSearchMenuVisibility: value => dispatch(setSearchMenuVisibility(value)),
  openEditModal: item => dispatch(openEditItemModal(item)),
  closeEditModal: () => dispatch(closeModal()),
  handleRemoveBoughtItems: (listId, data) => {
    dispatch(apiCall(`/lists/${listId}/items`, massUpdateItems, PUT, data));
  },
  handleMoveMissingItems: (listId, data) => {
    dispatch(apiCall(`/lists/${listId}/items`, massMoveItems, PUT, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
