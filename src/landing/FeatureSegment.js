// @flow
import * as React from 'react';
import { Header } from 'semantic-ui-react';

type Props = {
  headerText: string,
  children: React.Node,
}

const FeatureSegment = ({
  headerText, children
}: Props) => (
  <div className="feature-segment">
    <Header>
      {headerText}
    </Header>
    <p>
      {children}
    </p>
  </div>
);

export default FeatureSegment;
