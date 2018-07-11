// @flow
import React from 'react';
import { Button, Icon, List } from 'semantic-ui-react';

type Props = {
  color?: string,
  iconName: string,
  onClick: (void) => void,
  dataCy: string,
}

function ItemActionButton({
  color, iconName, onClick, dataCy
}: Props) {
  return (
    <List.Icon verticalAlign="middle">
      <Button
        color={color}
        icon
        circular
        onClick={onClick}
        data-cy={dataCy}
      >
        <Icon name={iconName} />
      </Button>
    </List.Icon>
  );
}

export default ItemActionButton;
