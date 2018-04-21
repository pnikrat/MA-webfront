// @flow
import React, { Component } from 'react';
import { Container, Dropdown, List, Segment } from 'semantic-ui-react';
import ItemActionButton from './ItemActionButton';

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

  render() {
    const itemsComponents = this.props.items.sort(this.compare).map(item =>
      (
        <List.Item key={item.id} className={item.aasm_state === 'bought' ? 'bought' : ''}>
          { item.aasm_state === 'to_buy' &&
            <ItemActionButton
              color="olive"
              iconName="checkmark"
              onClick={() => this.props.onItemStateChange(item, 'bought')}
            />
          }
          { item.aasm_state === 'to_buy' &&
            <ItemActionButton
              iconName="minus"
              onClick={() => this.props.onItemStateChange(item, 'missing')}
            />
          }
          { (item.aasm_state === 'bought' || item.aasm_state === 'missing') &&
            <ItemActionButton
              color="grey"
              iconName="undo"
              onClick={() => this.props.onItemStateChange(item, 'to_buy')}
            />
          }
          <List.Content className="full-width">
            <List.Header className="flexed">
              <div>{item.name}</div>
              <Dropdown text="">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="trash outline"
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
