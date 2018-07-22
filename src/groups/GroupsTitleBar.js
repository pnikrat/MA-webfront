// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ModuleTitle from '../common/ModuleTitle';

type Props = {
  currentUser: Object,
  currentGroup: Object,
  baseAction: string,
  routeGroupId: number,
  detailAction: string,
}

const GroupsTitleBar = ({
  currentUser, currentGroup, baseAction, routeGroupId, detailAction
}: Props) => (
  <div className="flexed medium-bottom-margin">
    <ModuleTitle iconName="group" dataCy="groups-container-header">
      Grupy
    </ModuleTitle>
    { !baseAction && !routeGroupId && !detailAction &&
      <Button primary as={Link} to="/groups/new" data-cy="to-new-group-form-button">Stwórz nową grupę</Button>
    }
    { routeGroupId && !detailAction && currentUser.id === currentGroup.creator_id &&
      <Button primary as={Link} to={`/groups/${routeGroupId}/invite`} data-cy="to-invite-form-button">
        Zaproś do grupy
      </Button>
    }
  </div>
);

export default GroupsTitleBar;
