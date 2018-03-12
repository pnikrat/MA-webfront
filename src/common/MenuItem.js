// @flow
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  position: string,
  path: string,
  iconName: string,
  text: string,
  clickCallback?: () => Object,
}

function MenuItem(props: Props) {
  return (
    <Menu.Item
      position={props.position}
      as={Link}
      to={props.path}
      onClick={props.clickCallback}
    >
      <Icon name={props.iconName} />
      {props.text}
    </Menu.Item>
  );
}

export default MenuItem;
