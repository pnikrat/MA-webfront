// @flow
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

type Props = {
  isOpen: boolean,
  header: string,
  content: string,
  negativeButtonText: string,
  positiveButtonText: string
}

function ConfirmationModal({
  isOpen, header, content, negativeButtonText, positiveButtonText
}: Props) {
  const actionClicked = (e, data) => { debugger };

  return (
    <Modal size="mini" open={isOpen} onActionClick={actionClicked}>
      <Modal.Header>
        {header}
      </Modal.Header>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative content={negativeButtonText} />
        <Button positive icon="checkmark" labelPosition="right" content={positiveButtonText} />
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmationModal;
