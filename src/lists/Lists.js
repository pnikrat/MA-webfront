// @flow
import React, { Component } from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';
import ConfirmationModal from '../common/ConfirmationModal';
import '../styles/lists.css';

type Props = {
  isConfirmationModalOpen: boolean,
  confirmationModalListId: Number,
  lists: Object,
  onListDelete: (Number) => void,
  onListClick: (Number) => void,
  closeConfirmationModal: () => void,
  openConfirmationModal: (Object, Number) => void,
}

class Lists extends Component<Props> {
  onListDelete = (id: Number) => {
    this.props.onListDelete(id);
  }

  render() {
    const listsItems = this.props.lists.map(list =>
      (
        <Segment
          color="blue"
          key={list.id}
          className="list-segment"
          onClick={() => this.props.onListClick(list.id)}
        >
          <p>{list.name}</p>
          <Icon
            link
            name="delete"
            onMouseDown={e => e.stopPropagation()}
            onClick={e => this.props.openConfirmationModal(e, list.id)}
          />
        </Segment>
      )
    );
    const { isConfirmationModalOpen, closeConfirmationModal, confirmationModalListId } = this.props;
    return (
      <Container>
        {listsItems}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          objectId={confirmationModalListId}
          onConfirm={this.onListDelete}
          header="Delete shopping list"
          content="Deleting the list will delete all shopping items inside. Do you want to continue?"
          negativeButtonText="No"
          positiveButtonText="Yes"
        />
      </Container>
    );
  }
}
export default Lists;
