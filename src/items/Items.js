// @flow
import React, { Component } from 'react';
import { Button, Container, Header, List, Segment, Dropdown } from 'semantic-ui-react';
import SingleItem from './SingleItem';

type Props = {
  items: Object,
  lists: Object,
  currentList: Object,
  onItemStateChange: (Object, string) => void,
  openEditModal: (Object) => void,
  isRemoveBoughtDisabled: boolean,
  isMoveMissingDisabled: boolean,
  removeBoughtItems: () => void,
  moveMissingItems: (Number) => void,
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

  mapAndReduce = (filterType: Function, items: Object) => items.filter(filterType)
    .map(i => [i.price, i.quantity]).reduce(this.sumMoney, 0.0);
  sumMoney = (prev: number, next: Array<any>) => prev + (Number(next[0]) * (next[1] || 1))
  active = (x: Object) => x.aasm_state === 'to_buy' || x.aasm_state === 'bought'
  bought = (x: Object) => x.aasm_state === 'bought'
  missing = (x: Object) => x.aasm_state === 'missing'
  otherLists = (x: Object) => x.id !== this.props.currentList.id

  singleItem = (item: Object) => (
    <SingleItem
      key={item.id}
      item={item}
      onItemStateChange={this.props.onItemStateChange}
      openEditModal={this.props.openEditModal}
    />
  );

  listOption = (list: Object) => (
    <Dropdown.Item
      key={list.id}
      onClick={() => this.props.moveMissingItems(list.id)}
    >
      {list.name}
    </Dropdown.Item>
  )

  render() {
    const {
      items, removeBoughtItems, isRemoveBoughtDisabled, lists, isMoveMissingDisabled
    } = this.props;
    const activeComponents = items.filter(this.active).sort(this.compare)
      .map(item => this.singleItem(item));
    const missingComponents = items.filter(this.missing)
      .map(item => this.singleItem(item));
    const availableLists = lists.filter(this.otherLists).map(list => this.listOption(list));

    const activeTotal = this.mapAndReduce(this.active, items);
    const boughtTotal = this.mapAndReduce(this.bought, items);

    return (
      <Container className="all-items-container">
        <Segment className="first-sublist sublist">
          <div className="flexed with-divider">
            <Header as="h3">To buy / Bought</Header>
            <div className="price-totals">
              <p>{`List value: ${activeTotal.toFixed(2)}$`}</p>
              <p>{`Cart value: ${boughtTotal.toFixed(2)}$`}</p>
            </div>
            <Button
              size="tiny"
              disabled={isRemoveBoughtDisabled}
              data-cy="remove-bought-items"
              onClick={() => removeBoughtItems()}
            >
              Remove bought
            </Button>
          </div>
          <List divided relaxed>
            {activeComponents}
          </List>
        </Segment>
        { missingComponents.length > 0 &&
          <Segment className="second-sublist sublist">
            <div className="flexed with-divider">
              <Header as="h3">Missing in shop</Header>
              <Dropdown
                text="Move missing to:"
                button
                data-cy="move-missing-items"
                className="tiny"
                disabled={isMoveMissingDisabled || availableLists.length === 0}
              >
                <Dropdown.Menu>
                  {availableLists}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <List divided relaxed>
              { missingComponents }
            </List>
          </Segment>
        }
      </Container>
    );
  }
}
export default Items;
