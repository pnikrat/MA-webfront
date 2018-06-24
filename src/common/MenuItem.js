// @flow
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  path: string,
  iconName: string,
  text: string,
  position?: string,
  clickCallback?: () => Object,
}

function MenuItem({
  position, path, clickCallback, iconName, text
}: Props) {
  return (
    <Menu.Item
      position={position}
      as={Link}
      to={path}
      onClick={clickCallback}
    >
      <Icon name={iconName} />
      {text}
    </Menu.Item>
  );
}

export default MenuItem;
