// @flow
import React, { Component } from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

type Props = {
  lists: Object,
  onListClick: (Number) => void,
  openConfirmationModal: (Object, Number) => void,
}

class Lists extends Component<Props> {
  render() {
    const { lists, onListClick, openConfirmationModal } = this.props;
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
          <Icon
            link
            name="delete"
            onMouseDown={e => e.stopPropagation()}
            onClick={e => openConfirmationModal(e, list.id)}
          />
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
