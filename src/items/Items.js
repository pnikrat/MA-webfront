// @flow
import React, { Component } from 'react';
import { Container, Dropdown, List, Radio, Segment } from 'semantic-ui-react';
import '../styles/items.css';

type Props = {
  items: Object,
  onItemDelete: (Number) => void,
  onItemToggle: (Object) => void,
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

  render() {
    const itemsComponents = this.props.items.sort(this.compare).map(item =>
      (
        <List.Item key={item.id} className={item.aasm_state === 'bought' ? 'bought' : ''}>
          <List.Icon verticalAlign="middle">
            <Radio
              toggle
              onClick={() => this.props.onItemToggle(item)}
              checked={item.aasm_state === 'bought'}
            />
          </List.Icon>
          <List.Content className="full-width">
            <List.Header className="flexed">
              <div>{item.name}</div>
              <Dropdown text="">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Delete"
                    onClick={() => this.props.onItemDelete(item.id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </List.Header>
            <List.Description className="flexed">
              <div>{item.quantity && `Quantity: ${item.quantity} ${item.unit}`}</div>
              <div>{item.price && `${item.price}$`}</div>
            </List.Description>
          </List.Content>
        </List.Item>
      )
    );

    return (
      <Container>
        <Segment color="blue">
          <List divided relaxed>
            {itemsComponents}
          </List>
        </Segment>
      </Container>
    );
  }
}
export default Items;
