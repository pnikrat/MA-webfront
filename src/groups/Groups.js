// @flow
import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';

type Props = {
  groups: Array<Object>,
}

class Groups extends Component<Props> {
  singleGroup = (group: Object) => (
    <Segment key={group.id} className="list-segment">
      <div>
        <p>{group.name}</p>
      </div>
    </Segment>
  );

  render() {
    const { groups } = this.props;
    const groupItems = groups.map(group => this.singleGroup(group));
    return (
      <Container>
        {groupItems}
      </Container>
    );
  }
}
export default Groups;
