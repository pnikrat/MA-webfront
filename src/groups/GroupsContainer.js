// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { setGroups, addGroupAndRedirectBack, showGroup,
  editGroup, updateGroupAndRedirectBack, deleteGroup,
  redirectBack, setCurrentGroup } from './GroupsActions';
import Groups from './Groups';
import { DecoratedNewGroupForm as NewGroupForm } from './NewGroupForm';
import EditGroupForm from './EditGroupForm';
import NewInviteForm from './NewInviteForm';
import GroupDetails from './GroupDetails';
import { openDeleteGroupModal, closeModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';
import ModalAcceptButton from '../common/ModalAcceptButton';
import GroupsTitleBar from './GroupsTitleBar';

type Props = {
  groups: Array<Object>,
  currentGroup: Object,
  currentUser: Object,
  isDeleteGroupModalOpen: boolean,
  deleteGroupModalGroupId: number,
  match: Object,
  clearForm: () => void,
  handleGroupsFetch: () => void,
  handleGroupAdd: (Object) => void,
  handleGroupShow: (number, Function) => void,
  handleGroupUpdate: (number, Object) => void,
  openDeleteModal: (Object, number) => void,
  closeDeleteModal: () => void,
  handleGroupDelete: (number) => void,
  handleInviteCreate: (Object) => void,
}

const RemoveGroupModal = ConfirmationModal(ModalAcceptButton);

class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
    if (this.props.match.params.routeGroupId) {
      this.props.handleGroupShow(this.props.match.params.routeGroupId, setCurrentGroup);
    }
  }

  handleGroupAdd = (data: Object) => {
    this.props.handleGroupAdd(data);
  }

  handleGroupUpdate = (data: Object) => {
    const { id } = data;
    this.props.handleGroupUpdate(id, data);
  }

  handleGroupShow = (id: number) => {
    this.props.handleGroupShow(id, showGroup);
  }

  handleGroupEditRedirect = (e: Object, id: number) => {
    e.stopPropagation();
    this.props.handleGroupShow(id, editGroup);
  }

  handleGroupDelete = (id: number) => {
    this.props.closeDeleteModal();
    this.props.handleGroupDelete(id);
  }

  handleInviteCreate = (data: Object) => {
    this.props.clearForm();
    this.props.handleInviteCreate(data);
  }

  render() {
    const {
      groups, currentGroup, currentUser, openDeleteModal, isDeleteGroupModalOpen,
      closeDeleteModal, deleteGroupModalGroupId, match,
    } = this.props;
    const { baseAction, routeGroupId, detailAction } = match.params;
    return (
      <Container>
        <GroupsTitleBar
          currentUser={currentUser}
          currentGroup={currentGroup}
          baseAction={baseAction}
          routeGroupId={routeGroupId}
          detailAction={detailAction}
        />
        { baseAction === '/new' &&
          <Segment>
            <Header as="h3" className="with-divider">Stwórz nową grupę</Header>
            <NewGroupForm onSubmit={this.handleGroupAdd} />
          </Segment>
        }
        { routeGroupId && detailAction === '/invite' &&
          <Segment>
            <Header as="h3" className="with-divider" data-cy="invite-form-header">
              {`Zaproś nową osobę do ${currentGroup.name}`}
            </Header>
            <NewInviteForm
              onSubmit={this.handleInviteCreate}
              initialValues={{ invitable_id: currentGroup.id, invitable_type: 'Group' }}
              submitText="Zaproś"
              placeholder="Wpisz email zapraszanego użytkownika"
            />
          </Segment>
        }
        { routeGroupId && detailAction === '/edit' &&
          <Segment>
            <Header as="h3" className="with-divider" data-cy="edit-group-form-header">{`Edytuj ${currentGroup.name}`}</Header>
            <EditGroupForm onSubmit={this.handleGroupUpdate} />
          </Segment>
        }
        { routeGroupId && !detailAction &&
          <GroupDetails
            group={currentGroup}
          />
        }
        { !routeGroupId && !baseAction && !detailAction &&
          <Groups
            groups={groups}
            onGroupClick={this.handleGroupShow}
            onEditClick={this.handleGroupEditRedirect}
            openConfirmationModal={openDeleteModal}
            currentUser={currentUser}
          />
        }
        <RemoveGroupModal
          isOpen={isDeleteGroupModalOpen}
          onClose={closeDeleteModal}
          objectId={deleteGroupModalGroupId}
          onConfirm={this.handleGroupDelete}
          header="Usuń grupę"
          negativeButtonText="Nie"
          positiveButtonText="Tak"
        >
          <p>
            Kiedy usuniesz grupę, wszyscy użytkownicy z tej grupy stracą dostęp do list
            zakupów pozostałych członków tej grupy. Czy na pewno chcesz kontynuować?
          </p>
        </RemoveGroupModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
  currentGroup: state.groupsReducer.currentGroup,
  currentUser: state.reduxTokenAuth.currentUser.attributes,
  isDeleteGroupModalOpen: state.modalsReducer.deleteGroup.isOpen,
  deleteGroupModalGroupId: state.modalsReducer.deleteGroup.id,
});

const mapDispatchToProps = dispatch => ({
  clearForm: () => dispatch(reset('newInvite')),
  handleGroupsFetch: () => dispatch(apiCall('/groups', setGroups, GET)),
  handleGroupAdd: group => dispatch(apiCall('/groups', addGroupAndRedirectBack, POST, group)),
  handleGroupShow: (id, callback) => dispatch(apiCall(`/groups/${id}`, callback, GET)),
  handleGroupUpdate: (id, data) => {
    dispatch(apiCall(`/groups/${id}`, updateGroupAndRedirectBack, PUT, data));
  },
  handleGroupDelete: id => dispatch(apiCall(`/groups/${id}`, () => deleteGroup(id), DELETE)),
  openDeleteModal: (e, id) => dispatch(openDeleteGroupModal(e, id)),
  closeDeleteModal: () => dispatch(closeModal()),
  handleInviteCreate: data => dispatch(apiCall('/invites', redirectBack, POST, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
