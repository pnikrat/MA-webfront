// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { apiCall } from '../services/apiActions';
import { GET, POST, DELETE } from '../state/constants';
import { setLists, addList, removeList } from './ListsActions';
import Lists from './Lists';
import { DecoratedNewListForm as NewListForm } from './NewListForm';
import EditListForm from './EditListForm';
import { closeModal, openDeleteListModal, openEditListModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';
import ModalAcceptButton from '../common/ModalAcceptButton';
import ModalSubmitButton from '../common/ModalSubmitButton';
import '../styles/lists.css';

type Props = {
  lists: Array<Object>,
  isDeleteListModalOpen: boolean,
  deleteListModalListId: number,
  isEditListModalOpen: boolean,
  handleListsFetch: () => void,
  handleListAdd: (Object) => void,
  clearForm: () => void,
  handleListDelete: (number) => void,
  openList: (Number) => void,
  closeListModal: () => void,
  openDeleteModal: (Object, number) => void,
  openEditModal: (Object, Object) => void,
}

const RemoveListModal = ConfirmationModal(ModalAcceptButton);
const EditListModal = ConfirmationModal(ModalSubmitButton);

class ListsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleListsFetch();
  }

  onListDelete = (id: number) => {
    this.props.closeListModal();
    this.props.handleListDelete(id);
  }

  onListEdit = (data) => {
    this.props.closeListModal();
    const { id } = data;
    // this.props.handleListEdit(id, data);
  }

  handleListAdd = (data: Object) => {
    this.props.clearForm();
    this.props.handleListAdd(data);
  }

  render() {
    const {
      isDeleteListModalOpen, lists, openList, openDeleteModal, openEditModal,
      closeListModal, deleteListModalListId, isEditListModalOpen,
    } = this.props;
    return (
      <Container>
        <Container className="form-container">
          <Segment>
            <Header as="h3" className="with-divider">Add shopping list</Header>
            <NewListForm onSubmit={this.handleListAdd} />
          </Segment>
        </Container>
        <Lists
          lists={lists}
          onListClick={openList}
          openConfirmationModal={openDeleteModal}
          openEditListModal={openEditModal}
        />
        <RemoveListModal
          isOpen={isDeleteListModalOpen}
          onClose={closeListModal}
          objectId={deleteListModalListId}
          onConfirm={this.onListDelete}
          header="Delete shopping list"
          negativeButtonText="No"
          positiveButtonText="Yes"
        >
          <p>Deleting the list will delete all shopping items inside. Do you want to continue?</p>
        </RemoveListModal>
        <EditListModal
          isOpen={isEditListModalOpen}
          onClose={closeListModal}
          formReduxName="editList"
          header="Edit list"
          negativeButtonText="Discard changes"
        >
          <EditListForm onSubmit={this.onListEdit} />
        </EditListModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.listsReducer.lists,
  isDeleteListModalOpen: state.modalsReducer.deleteList.isOpen,
  deleteListModalListId: state.modalsReducer.deleteList.id,
  isEditListModalOpen: state.modalsReducer.editList.isOpen,
});

const mapDispatchToProps = dispatch => ({
  handleListsFetch: () => dispatch(apiCall('/lists', setLists, GET)),
  handleListAdd: list => dispatch(apiCall('/lists', addList, POST, list)),
  clearForm: () => dispatch(reset('newList')),
  handleListDelete: id => dispatch(apiCall(`/lists/${String(id)}`, () => removeList(id), DELETE)),
  openList: id => dispatch(push(`/list/${id}/items`)),
  closeListModal: () => dispatch(closeModal()),
  openDeleteModal: (e, id) => dispatch(openDeleteListModal(e, id)),
  openEditModal: (e, list) => dispatch(openEditListModal(e, list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
