// @flow
import React, { Component } from 'react';
import { Header, List, Segment } from 'semantic-ui-react';

type Props = {
  group: Object,
}

class GroupDetails extends Component<Props> {
  props: Props

  compare = (x: Object) => {
    return x.id === this.props.group.creator_id ? -1 : 1;
  }
  singleMember = (member: Object) => (
    <List.Item key={member.id}>
      <div>
        <p>{`${member.first_name} ${member.last_name || ''}`}</p>
      </div>
    </List.Item>
  );

  render() {
    const { group } = this.props;
    const users = group.users ? group.users : [];
    const members = users.sort(this.compare).map(user => this.singleMember(user));
    return (
      <Segment>
        <Header as="h3" className="with-divider">{group.name}</Header>
        <List divided relaxed data-cy="members-list">
          {members}
        </List>
      </Segment>
    );
  }
}
export default GroupDetails;
