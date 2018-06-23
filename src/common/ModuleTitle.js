// @flow
import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

type Props = {
  iconName: string,
  className?: string,
  children: React.Node,
}

const ModuleTitle = ({
  iconName, className, children
}: Props) => (
  <div className={className}>
    <Header as="h2">
      <Icon name={iconName} />
      <Header.Content>
        {children}
      </Header.Content>
    </Header>
  </div>
);

export default ModuleTitle;
