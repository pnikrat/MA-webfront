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
  isMoveUnavailableDisabled: boolean,
  removeBoughtItems: () => void,
  moveUnavailableItems: (Number) => void,
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
      onClick={() => this.props.moveUnavailableItems(list.id)}
    >
      {list.name}
    </Dropdown.Item>
  )

  render() {
    const {
      items, removeBoughtItems, isRemoveBoughtDisabled, lists, isMoveUnavailableDisabled
    } = this.props;
    const activeComponents = items.filter(this.toBuy).sort(this.compare)
      .map(item => this.singleItem(item));
    const unavailableComponents = items.filter(this.unavailable)
      .map(item => this.singleItem(item));
    const availableLists = lists.filter(this.otherLists).map(list => this.listOption(list));

    return (
      <Container className="all-items-container">
        <Segment className="first-sublist sublist">
          <div className="flexed with-divider">
            <Header as="h3">To buy / Bought</Header>
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
        { unavailableComponents.length > 0 &&
          <Segment className="second-sublist sublist">
            <div className="flexed with-divider">
              <Header as="h3">Unavailable in shop</Header>
              <Dropdown
                text="Move unavailable to:"
                button
                className="tiny"
                disabled={isMoveUnavailableDisabled}
              >
                <Dropdown.Menu>
                  {availableLists}
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
