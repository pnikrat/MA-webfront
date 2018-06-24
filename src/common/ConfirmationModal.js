// @flow
import * as React from 'react';
import { Button, Modal } from 'semantic-ui-react';

function ConfirmationModal(ModalPositiveButton: React.Component) {
  type Props = {
    isOpen: boolean,
    objectId?: number,
    header: string,
    children?: React.Node,
    negativeButtonText: string,
    positiveButtonText?: string,
    onClose: () => void,
    onConfirm?: (number) => void,
  }

  return class extends React.Component<Props> {
    render() {
      const {
        isOpen, header, children, negativeButtonText, onClose, ...passThroughProps
      } = this.props;
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
            <ModalPositiveButton {...passThroughProps} />
          </Modal.Actions>
        </Modal>
      );
    }
  };
}

export default ConfirmationModal;
