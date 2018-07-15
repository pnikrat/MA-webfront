// @flow
import React from 'react';
import { Button, Icon, Popup, Segment } from 'semantic-ui-react';

type Props = {
  group: Object,
  isCreator: boolean,
  onGroupClick: (number) => void,
  onEditClick: (Object, number) => void,
  openConfirmationModal: (Object, number) => void,
}

const SingleGroup = ({
  group, isCreator, onGroupClick, onEditClick, openConfirmationModal
}: Props) => (
  <Segment
    className="list-segment flexed"
    onClick={() => onGroupClick(group.id)}
  >
    <div className="flexed">
      { isCreator &&
        <Popup
          trigger={<Icon name="star" data-cy="creator-icon" className="small-top-margin" />}
          content="You are group creator"
        />
      }
      { !isCreator &&
        <Popup
          trigger={<Icon name="user" data-cy="member-icon" className="small-top-margin" />}
          content="You are group member"
        />
      }
      <p>{group.name}</p>
    </div>
    { isCreator &&
      <div className="flexed">
        <Button
          compact
          basic
          color="blue"
          data-cy="edit-group-button"
          onMouseDown={e => e.stopPropagation()}
          onClick={e => onEditClick(e, group.id)}
        >
          Edit
        </Button>
        <Button
          compact
          color="red"
          data-cy="delete-group-button"
          onMouseDown={e => e.stopPropagation()}
          onClick={e => openConfirmationModal(e, group.id)}
        >
          Delete
        </Button>
      </div>
    }
  </Segment>
);

export default SingleGroup;
