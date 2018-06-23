// @flow
import React, { Component } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';

type Props = {
  groups: Array<Object>,
  onGroupClick: (number) => void,
  onEditClick: (Object, number) => void,
}

class Groups extends Component<Props> {
  singleGroup = (group: Object) => (
    <Segment
      key={group.id}
      className="list-segment flexed"
      onClick={() => this.props.onGroupClick(group.id)}
    >
      <div>
        <p>{group.name}</p>
      </div>
      <div className="flexed">
        <Button
          compact
          basic
          color="blue"
          onMouseDown={e => e.stopPropagation()}
          onClick={e => this.props.onEditClick(e, group.id)}
        >
          Edit
        </Button>
        <Button compact color="red">Delete</Button>
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
