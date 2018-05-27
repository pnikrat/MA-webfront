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
import ListsForm from './ListsForm';
import { closeModal, openListsModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';
import ModalAcceptButton from '../common/ModalAcceptButton';
import '../styles/lists.css';

type Props = {
  lists: Object,
  isConfirmationModalOpen: boolean,
  confirmationModalListId: Number,
  handleListsFetch: () => void,
  handleListAdd: (Object) => void,
  clearForm: () => void,
  handleListDelete: (Number) => void,
  openList: (Number) => void,
  closeConfirmationModal: () => void,
  openConfirmationModal: (Object, Number) => void,
}

const RemoveListModal = ConfirmationModal(ModalAcceptButton);

class ListsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleListsFetch();
  }

  onListDelete = (id: Number) => {
    this.props.closeConfirmationModal();
    this.props.handleListDelete(id);
  }

  handleListAdd = (data: Object) => {
    this.props.clearForm();
    this.props.handleListAdd(data);
  }

  render() {
    const {
      isConfirmationModalOpen, lists, openList, openConfirmationModal,
      closeConfirmationModal, confirmationModalListId
    } = this.props;
    return (
      <Container>
        <Container className="form-container">
          <Segment>
            <Header as="h3" className="with-divider">Add shopping list</Header>
            <ListsForm onSubmit={this.handleListAdd} />
          </Segment>
        </Container>
        <Lists
          lists={lists}
          onListClick={openList}
          openConfirmationModal={openConfirmationModal}
        />
        <RemoveListModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          objectId={confirmationModalListId}
          onConfirm={this.onListDelete}
          header="Delete shopping list"
          negativeButtonText="No"
          positiveButtonText="Yes"
        >
          <p>Deleting the list will delete all shopping items inside. Do you want to continue?</p>
        </RemoveListModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.listsReducer.lists,
  isConfirmationModalOpen: state.modalsReducer.lists.isOpen,
  confirmationModalListId: state.modalsReducer.lists.id,
});

const mapDispatchToProps = dispatch => ({
  handleListsFetch: () => dispatch(apiCall('/lists', setLists, GET)),
  handleListAdd: list => dispatch(apiCall('/lists', addList, POST, list)),
  clearForm: () => dispatch(reset('lists')),
  handleListDelete: id => dispatch(apiCall(`/lists/${String(id)}`, () => removeList(id), DELETE)),
  openList: id => dispatch(push(`/list/${id}/items`)),
  closeConfirmationModal: () => dispatch(closeModal()),
  openConfirmationModal: (e, id) => dispatch(openListsModal(e, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
