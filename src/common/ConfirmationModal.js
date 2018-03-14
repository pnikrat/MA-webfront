// @flow
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

type Props = {
  isOpen: boolean,
  objectId: Number,
  header: string,
  content: string,
  negativeButtonText: string,
  positiveButtonText: string,
  onClose: () => void,
  onConfirm: (Number) => void,
}

function ConfirmationModal({
  isOpen, header, content, negativeButtonText, positiveButtonText,
  onClose, objectId, onConfirm
}: Props) {
  const modalConfirmed = (id) => {
    onConfirm(id);
    onClose();
  };

  return (
    <Modal size="mini" open={isOpen} onClose={onClose}>
      <Modal.Header>
        {header}
      </Modal.Header>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          content={negativeButtonText}
          onClick={onClose}
        />
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content={positiveButtonText}
          onClick={() => modalConfirmed(objectId)}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmationModal;
