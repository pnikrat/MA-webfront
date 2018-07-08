// @flow
import React, { Component } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';

type Props = {
  lists: Array<Object>,
  currentUser: Object,
  onListClick: (Number) => void,
  openConfirmationModal: (Object, number) => void,
  openEditListModal: (Object, Object) => void,
}

class Lists extends Component<Props> {
  compare = (x: Object, y: Object) => {
    if (x.user_id === y.user_id) {
      if (x.id < y.id) {
        return -1;
      }
      return 1;
    }
    return x.user_id === this.props.currentUser.id ? -1 : 1;
  }

  isCreator = (creatorId: number) => this.props.currentUser.id === creatorId

  render() {
    const {
      lists, onListClick, openConfirmationModal, openEditListModal
    } = this.props;
    const listsItems = lists.sort(this.compare).map(list =>
      (
        <Segment
          key={list.id}
          className="list-segment"
          onClick={() => onListClick(list.id)}
        >
          <div>
            <p>{list.name}</p>
          </div>
          <div className="flexed">
            <Button
              compact
              basic
              color="blue"
              onMouseDown={e => e.stopPropagation()}
              onClick={e => openEditListModal(e, list)}
            >
              Edit
            </Button>
            { this.isCreator(list.user_id) &&
              <Button
                compact
                color="red"
                data-cy="delete-list-button"
                onMouseDown={e => e.stopPropagation()}
                onClick={e => openConfirmationModal(e, list.id)}
              >
                Delete
              </Button>
            }
          </div>
        </Segment>
      )
    );
    return (
      <Container>
        {listsItems}
      </Container>
    );
  }
}
export default Lists;
