// @flow
import React, { Component } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';

type Props = {
  lists: Array<Object>,
  onListClick: (Number) => void,
  openConfirmationModal: (Object, number) => void,
  openEditListModal: (Object, Object) => void,
}

class Lists extends Component<Props> {
  render() {
    const {
      lists, onListClick, openConfirmationModal, openEditListModal
    } = this.props;
    const listsItems = lists.map(list =>
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
            <Button
              compact
              color="red"
              onMouseDown={e => e.stopPropagation()}
              onClick={e => openConfirmationModal(e, list.id)}
            >
              Delete
            </Button>
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
