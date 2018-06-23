// @flow
import React, { Component } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


type Props = {
  groups: Array<Object>,
  onGroupClick: (number) => void,
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
        <Button basic color="blue" as={Link} to={`/groups/${group.id}/edit`}>Edit</Button>
        <Button color="red">Delete</Button>
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
