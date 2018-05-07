// @flow
import React, { Component } from 'react';
import { Container, Header, List, Segment } from 'semantic-ui-react';
import SingleItem from './SingleItem';

type Props = {
  items: Object,
  onItemDelete: (Number) => void,
  onItemStateChange: (Object, string) => void,
}

class Items extends Component<Props> {
  props: Props

  compare = (x: Object, y: Object) => {
    if (x.aasm_state === y.aasm_state) {
      if (x.id < y.id) {
        return -1;
      }
      return 1;
    }
    return x.aasm_state === 'to_buy' ? -1 : 1;
  }

  toBuy = (x: Object) => x.aasm_state === 'to_buy' || x.aasm_state === 'bought'
  unavailable = (x: Object) => x.aasm_state === 'missing'

  singleItem = (item: Object) => (
    <SingleItem
      item={item}
      onItemDelete={this.props.onItemDelete}
      onItemStateChange={this.props.onItemStateChange}
    />
  );

  render() {
    const { items } = this.props;
    const activeComponents = items.filter(this.toBuy).sort(this.compare)
      .map(item => this.singleItem(item));
    const unavailableComponents = items.filter(this.unavailable)
      .map(item => this.singleItem(item));

    return (
      <Container className="all-items-container">
        <Segment className="first-sublist sublist">
          <Header as="h3" className="with-divider">To buy / Bought</Header>
          <List divided relaxed>
            {activeComponents}
          </List>
        </Segment>
        { unavailableComponents.length > 0 &&
          <Segment className="second-sublist sublist">
            <Header as="h3" className="with-divider">Unavailable in shop</Header>
            <List divided relaxed>
              { unavailableComponents }
            </List>
          </Segment>
        }
      </Container>
    );
  }
}
export default Items;
