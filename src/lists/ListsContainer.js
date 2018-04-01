// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import api from '../services/api';
import { setLists, addList, removeList } from './ListsActions';
import Lists from './Lists';
import ListsForm from './ListsForm';
import { closeListsModal, openListsModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';
import '../styles/lists.css';

type Props = {
  lists: Object,
  isConfirmationModalOpen: boolean,
  confirmationModalListId: Number,
  handleListsFetch: (Object) => void,
  handleListAdd: (Object) => void,
  clearForm: () => void,
  handleListDelete: (Number) => void,
  openList: (Number) => void,
  closeConfirmationModal: () => void,
  openConfirmationModal: (Object, Number) => void,
}

class ListsContainer extends Component<Props> {
  componentDidMount = () => {
    api.get('/lists').then(response =>
      this.props.handleListsFetch(response.data));
  }

  onListDelete = (id: Number) => {
    api.delete(`/lists/${String(id)}`).then(() =>
      this.props.handleListDelete(id));
  }

  handleListAdd = (data: Object) => {
    this.props.clearForm();
    api.post('/lists', data).then(response =>
      this.props.handleListAdd(response.data));
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
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          objectId={confirmationModalListId}
          onConfirm={this.onListDelete}
          header="Delete shopping list"
          content="Deleting the list will delete all shopping items inside. Do you want to continue?"
          negativeButtonText="No"
          positiveButtonText="Yes"
        />
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
  handleListsFetch: lists => dispatch(setLists(lists)),
  handleListAdd: list => dispatch(addList(list)),
  clearForm: () => dispatch(reset('lists')),
  handleListDelete: id => dispatch(removeList(id)),
  openList: id => dispatch(push(`/list/${id}/items`)),
  closeConfirmationModal: () => dispatch(closeListsModal()),
  openConfirmationModal: (e, id) => dispatch(openListsModal(e, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
