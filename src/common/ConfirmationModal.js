// @flow
import * as React from 'react';
import { Button, Modal } from 'semantic-ui-react';

type Props = {
  isOpen: boolean,
  objectId: any,
  header: string,
  children?: React.Node,
  negativeButtonText: string,
  positiveButtonText: string,
  onClose: () => void,
  onConfirm: (any) => void,
}

function ConfirmationModal({
  isOpen, header, children, negativeButtonText, positiveButtonText,
  onClose, objectId, onConfirm
}: Props) {
  const modalConfirmed = (id) => {
    onConfirm(id);
    onClose();
  };

  return (
    <Modal size="small" open={isOpen} onClose={onClose}>
      <Modal.Header>
        {header}
      </Modal.Header>
      <Modal.Content>
        {children}
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
