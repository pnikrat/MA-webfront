// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';

type Props = {
  positiveButtonText: string,
  objectId: Number,
  onConfirm: (Number) => void,
}

function ModalAcceptButton({
  positiveButtonText, objectId, onConfirm
}: Props) {
  return (
    <Button
      positive
      icon="checkmark"
      labelPosition="right"
      content={positiveButtonText}
      onClick={() => onConfirm(objectId)}
    />
  );
}

export default ModalAcceptButton;
