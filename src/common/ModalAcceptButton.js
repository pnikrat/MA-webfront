// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';

type Props = {
  positiveButtonText: string,
  objectId: number,
  onConfirm: (number) => void,
}

function ModalAcceptButton({
  positiveButtonText, objectId, onConfirm
}: Props) {
  return (
    <Button
      positive
      icon="checkmark"
      labelPosition="right"
      data-cy="accept-modal"
      content={positiveButtonText}
      onClick={() => onConfirm(objectId)}
    />
  );
}

export default ModalAcceptButton;
