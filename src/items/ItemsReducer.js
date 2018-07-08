import { SET_CURRENT_LIST, SET_ITEMS, ADD_ITEM, EDIT_ITEM,
  REMOVE_ITEM } from '../state/constants';

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
        items: state.items.findIndex(i => i.id === action.item.id) === -1
          ? [...state.items, action.item]
          : state.items
      });
    case EDIT_ITEM:
      return Object.assign({}, state, {
        currentList: state.currentList,
        items: state.items.map((i) => {
          return (i.id === action.payload.id) ? { ...i, ...action.payload } : i;
        })
      });
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        currentList: state.currentList,
        items: state.items.filter(i => i.id !== action.payload)
      });
    default:
      return state;
  }
}

export default itemsReducer;
