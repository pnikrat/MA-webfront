// @flow
import React from 'react';
import { Button, Icon, List } from 'semantic-ui-react';

type Props = {
  color?: string,
  iconName: string,
  onClick: (void) => void,
}

function ItemActionButton({ color, iconName, onClick }: Props) {
  return (
    <List.Icon verticalAlign="middle">
      <Button
        color={color}
        icon
        circular
        onClick={onClick}
      >
        <Icon name={iconName} />
      </Button>
    </List.Icon>
  );
}

export default ItemActionButton;
