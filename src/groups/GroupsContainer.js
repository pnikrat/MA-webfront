// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { Route, Link, Switch } from 'react-router-dom';
import { apiCall } from '../services/apiActions';
import { GET, POST } from '../state/constants';
import { setGroups, addGroupAndRedirectBack, showGroup, editGroup } from './GroupsActions';
import ModuleTitle from '../common/ModuleTitle';
import Groups from './Groups';
import { DecoratedNewGroupForm as NewGroupForm } from './NewGroupForm';
import EditGroupForm from './EditGroupForm';
import GroupDetails from './GroupDetails';

type Props = {
  groups: Array<Object>,
  currentGroup: Object,
  handleGroupsFetch: () => void,
  handleGroupAdd: (Object) => void,
  handleGroupShow: (number, Function) => void,
}

class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
  }

  handleGroupAdd = (data: Object) => {
    this.props.handleGroupAdd(data);
  }

  handleGroupUpdate = (data: Object) => {
    //didnt do nuthin
  }

  handleGroupShow = (id: number) => {
    this.props.handleGroupShow(id, showGroup);
  }

  handleGroupEditRedirect = (e: Object, id: number) => {
    e.stopPropagation();
    this.props.handleGroupShow(id, editGroup);
  }

  render() {
    const {
      groups, currentGroup
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
              />
            )}
          />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
  currentGroup: state.groupsReducer.currentGroup,
});

const mapDispatchToProps = dispatch => ({
  handleGroupsFetch: () => dispatch(apiCall('/groups', setGroups, GET)),
  handleGroupAdd: group => dispatch(apiCall('/groups', addGroupAndRedirectBack, POST, group)),
  handleGroupShow: (id, callback) => dispatch(apiCall(`/groups/${id}`, callback, GET)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
