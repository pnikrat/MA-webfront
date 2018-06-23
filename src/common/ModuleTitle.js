// @flow
import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

type Props = {
  iconName: string,
  children: React.Node,
}

const ModuleTitle = ({
  iconName, children
}: Props) => (
  <div className="medium-bottom-margin">
    <Header as="h2">
      <Icon name={iconName} />
      <Header.Content>
        {children}
      </Header.Content>
    </Header>
  </div>
);

export default ModuleTitle;
