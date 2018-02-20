// @flow
import React, { Component } from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';
import '../styles/lists.css';

type Props = {
  lists: Object,
  onListDelete: (Number) => void,
}

class Lists extends Component<Props> {
  props: Props

  render() {
    const listsItems = this.props.lists.map(list =>
      (
        <Segment color="blue" key={list.id} className="list-segment">
          <p>{list.name}</p>
          <Icon link name="delete" onClick={() => this.props.onListDelete(list.id)} />
        </Segment>
      )
    );

    return (
      <Container>
        {listsItems}
      </Container>
    );
  }
}
export default Lists;
