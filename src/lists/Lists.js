// @flow
import React, { Component } from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';
import '../styles/lists.css';

type Props = {
  lists: Object,
  onListDelete: (Number) => void,
  onListClick: (Number) => void,
}

class Lists extends Component<Props> {
  onListDelete = (e: Object, id: Number) => {
    e.stopPropagation();
    this.props.onListDelete(id);
  }

  props: Props

  render() {
    const listsItems = this.props.lists.map(list =>
      (
        <Segment
          color="blue"
          key={list.id}
          className="list-segment"
          onClick={() => this.props.onListClick(list.id)}
        >
          <p>{list.name}</p>
          <Icon
            link
            name="delete"
            onMouseDown={e => e.stopPropagation()}
            onClick={e => this.onListDelete(e, list.id)}
          />
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
