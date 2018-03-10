import { SET_CURRENT_LIST, SET_ITEMS, ADD_ITEM,
  REMOVE_ITEM, TOGGLE_ITEM } from './ItemsActions';

function nextItemState(aasmState) {
  return aasmState === 'to_buy' ? 'bought' : 'to_buy';
}

function itemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_LIST:
      return Object.assign({}, state, {
        currentList: action.list
      });
    case SET_ITEMS:
      return Object.assign({}, state, {
        currentList: state.currentList,
        items: action.items
      });
    case ADD_ITEM:
      return Object.assign({}, state, {
        currentList: state.currentList,
        items: [
          ...state.items,
          action.item
        ]
      });
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        currentList: state.currentList,
        items: state.items.filter(i => i.id !== action.payload)
      });
    case TOGGLE_ITEM:
      return Object.assign({}, state, {
        currentList: state.currentList,
        items: state.items.map((i) => {
          return (i.id === action.payload)
            ? { ...i, aasm_state: nextItemState(i.aasm_state) } : i
        })
      });
    default:
      return state;
  }
}

export default itemsReducer;
