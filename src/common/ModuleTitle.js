// @flow
import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

type Props = {
  iconName: string,
  className?: string,
  children: React.Node,
  dataCy?: string,
}

const ModuleTitle = ({
  iconName, className, children, dataCy,
}: Props) => (
  <div className={className}>
    <Header as="h2">
      <Icon name={iconName} />
      <Header.Content data-cy={dataCy}>
        {children}
      </Header.Content>
    </Header>
  </div>
);

export default ModuleTitle;
