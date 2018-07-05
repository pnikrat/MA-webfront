// @flow
import createConsumer from './websocket';
import { ADD_ITEM, REMOVE_ITEM, EDIT_ITEM, TOGGLE_ITEM } from '../state/constants';
import { addItem, removeItem, editItem, toggleItem } from '../items/ItemsActions';

class ListSubscription {
  listId: number;
  cable: Object;
  channel: Object;
  connected: () => void;
  received: (string) => void;

  constructor(listId: number) {
    this.listId = listId;
    this.cable = createConsumer();
  }

  subscribe = () => {
    this.channel = this.cable.subscriptions.create(
      { channel: 'ListChannel', list_id: this.listId },
      { received: this.received }
    );
  }

  unsubscribe = () => this.channel.unsubscribe();

  received = (data: string) => {
    const parsedData = JSON.parse(data);
    switch (parsedData.event_type) {
      case ADD_ITEM:
        addItem(parsedData.data);
        break;
      case REMOVE_ITEM:
        removeItem(parsedData.data);
        break;
      case EDIT_ITEM:
        editItem(parsedData.data);
        break;
      case TOGGLE_ITEM:
        toggleItem(parsedData.data);
        break;
      default:
        break;
    }
  }
}

export default ListSubscription;
