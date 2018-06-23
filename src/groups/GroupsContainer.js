// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { Route, Link, Switch } from 'react-router-dom';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { setGroups, addGroupAndRedirectBack, showGroup,
  editGroup, updateGroupAndRedirectBack, deleteGroup } from './GroupsActions';
import ModuleTitle from '../common/ModuleTitle';
import Groups from './Groups';
import { DecoratedNewGroupForm as NewGroupForm } from './NewGroupForm';
import EditGroupForm from './EditGroupForm';
import GroupDetails from './GroupDetails';
import { openDeleteGroupModal, closeModal } from '../state/ModalsState';
import ConfirmationModal from '../common/ConfirmationModal';
import ModalAcceptButton from '../common/ModalAcceptButton';

type Props = {
  groups: Array<Object>,
  currentGroup: Object,
  isConfirmationModalOpen: boolean,
  confirmationModalGroupId: number,
  handleGroupsFetch: () => void,
  handleGroupAdd: (Object) => void,
  handleGroupShow: (number, Function) => void,
  handleGroupUpdate: (number, Object) => void,
  openConfirmationModal: (Object, number) => void,
  closeConfirmationModal: () => void,
  handleGroupDelete: (number) => void,
}

const RemoveGroupModal = ConfirmationModal(ModalAcceptButton);

class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
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
    this.props.closeConfirmationModal();
    this.props.handleGroupDelete(id);
  }

  render() {
    const {
      groups, currentGroup, openConfirmationModal, isConfirmationModalOpen,
      closeConfirmationModal, confirmationModalGroupId
    } = this.props;
    return (
      <Container>
        <div className="flexed medium-bottom-margin">
          <ModuleTitle iconName="group">
            Groups
          </ModuleTitle>
          <Route
            path="/groups"
            exact
            render={() => (
              <Button primary as={Link} to="/groups/new">Create new group</Button>
            )}
          />
        </div>
        <Switch>
          <Route
            path="/groups/new"
            render={() => (
              <Segment>
                <Header as="h3" className="with-divider">Create new group</Header>
                <NewGroupForm onSubmit={this.handleGroupAdd} />
              </Segment>
            )}
          />
          <Route
            path="/groups/:id/edit"
            render={() => (
              <Segment>
                <Header as="h3" className="with-divider">{`Edit ${currentGroup.name}`}</Header>
                <EditGroupForm onSubmit={this.handleGroupUpdate} />
              </Segment>
            )}
          />
          <Route
            path="/groups/:id"
            render={() => (
              <GroupDetails
                group={currentGroup}
              />
            )}
          />
          <Route
            path="/groups"
            render={() => (
              <Groups
                groups={groups}
                onGroupClick={this.handleGroupShow}
                onEditClick={this.handleGroupEditRedirect}
                openConfirmationModal={openConfirmationModal}
              />
            )}
          />
        </Switch>
        <RemoveGroupModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          objectId={confirmationModalGroupId}
          onConfirm={this.handleGroupDelete}
          header="Delete group"
          negativeButtonText="No"
          positiveButtonText="Yes"
        >
          <p>When you delete the group all users from the group will lose
          access to each other's shopping lists. Are you sure you want to continue?</p>
        </RemoveGroupModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
  currentGroup: state.groupsReducer.currentGroup,
  isConfirmationModalOpen: state.modalsReducer.groups.isOpen,
  confirmationModalGroupId: state.modalsReducer.groups.id,
});

const mapDispatchToProps = dispatch => ({
  handleGroupsFetch: () => dispatch(apiCall('/groups', setGroups, GET)),
  handleGroupAdd: group => dispatch(apiCall('/groups', addGroupAndRedirectBack, POST, group)),
  handleGroupShow: (id, callback) => dispatch(apiCall(`/groups/${id}`, callback, GET)),
  handleGroupUpdate: (id, data) => {
    dispatch(apiCall(`/groups/${id}`, updateGroupAndRedirectBack, PUT, data));
  },
  handleGroupDelete: id => dispatch(apiCall(`/groups/${id}`, () => deleteGroup(id), DELETE)),
  openConfirmationModal: (e, id) => dispatch(openDeleteGroupModal(e, id)),
  closeConfirmationModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
