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
    key={group.id}
    className="list-segment flexed"
    onClick={() => onGroupClick(group.id)}
  >
    <div className="flexed">
      { isCreator &&
        <Popup
          trigger={<Icon name="star" className="small-top-margin" />}
          content="You are group creator"
        />
      }
      { !isCreator &&
        <Popup
          trigger={<Icon name="user" className="small-top-margin" />}
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
          onMouseDown={e => e.stopPropagation()}
          onClick={e => onEditClick(e, group.id)}
        >
          Edit
        </Button>
        <Button
          compact
          color="red"
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
