// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import SingleGroup from './SingleGroup';

type Props = {
  groups: Array<Object>,
  currentUser: Object,
  onGroupClick: (number) => void,
  onEditClick: (Object, number) => void,
  openConfirmationModal: (Object, number) => void,
}

class Groups extends Component<Props> {
  props: Props

  isCreator = (creatorId: number) => this.props.currentUser.id === creatorId
  compare = (x: Object) => {
    return x.creator_id === this.props.currentUser.id ? -1 : 1;
  };

  singleGroup = (group: Object) => (
    <SingleGroup
      key={group.id}
      group={group}
      isCreator={this.isCreator(group.creator_id)}
      {...this.props}
    />
  );

  render() {
    const { groups } = this.props;
    const groupItems = groups.sort(this.compare).map(group => this.singleGroup(group));
    return (
      <Container data-cy="groups-container">
        {groupItems}
      </Container>
    );
  }
}
export default Groups;
