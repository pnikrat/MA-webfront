// @flow
import createConsumer from './websocket';
import { ADD_ITEM, REMOVE_ITEM, EDIT_ITEM, TOGGLE_ITEM } from '../state/constants';
import { addItem, removeItem, editItem, toggleItem } from '../items/ItemsActions';

class ListSubscription {
  listId: number;
  cable: Object;
  dispatch: (Object) => void;
  channel: Object;
  connected: () => void;
  received: (string) => void;

  constructor(listId: number, dispatch: (Object) => void) {
    this.listId = listId;
    this.cable = createConsumer();
    this.dispatch = dispatch;
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
    const action = this.determineAction(parsedData);
    if (action) {
      this.dispatch(action);
    }
  }

  determineAction = (parsedData: Object) => {
    switch (parsedData.event_type) {
      case ADD_ITEM: return addItem(parsedData);
      case REMOVE_ITEM: return removeItem(parsedData.data);
      case EDIT_ITEM: return editItem(parsedData);
      default: return null;
    }
  }
}

export default ListSubscription;
