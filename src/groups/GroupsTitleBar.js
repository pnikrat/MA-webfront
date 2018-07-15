// @flow
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ModuleTitle from '../common/ModuleTitle';

type Props = {
  currentUser: Object,
  currentGroup: Object,
}

const GroupsTitleBar = ({
  currentUser, currentGroup
}: Props) => (
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
    <Route
      path="/groups/:id"
      exact
      render={({ match }) => (
        currentUser.id === currentGroup.creator_id && match.params.id ? (
          <Button primary as={Link} to={`/groups/${match.params.id}/invite`}>
            Invite new member
          </Button>
        ) : (null)
      )}
    />
  </div>
);

export default GroupsTitleBar;
