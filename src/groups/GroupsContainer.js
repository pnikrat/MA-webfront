// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { Route, Link, Switch } from 'react-router-dom';
import { apiCall } from '../services/apiActions';
import { GET, POST } from '../state/constants';
import { setGroups, addGroupAndRedirectBack, showGroup } from './GroupsActions';
import ModuleTitle from '../common/ModuleTitle';
import Groups from './Groups';
import NewGroupForm from './NewGroupForm';
import GroupDetails from './GroupDetails';

type Props = {
  groups: Array<Object>,
  currentGroup: Object,
  handleGroupsFetch: () => void,
  handleGroupAdd: (Object) => void,
  handleGroupShow: (number) => void,
}


class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
  }

  handleGroupAdd = (data: Object) => {
    this.props.handleGroupAdd(data);
  }

  render() {
    const {
      groups, handleGroupShow, currentGroup
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
                onGroupClick={handleGroupShow}
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
  handleGroupShow: id => dispatch(apiCall(`/groups/${id}`, showGroup, GET)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
