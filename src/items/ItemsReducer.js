import { SET_CURRENT_LIST, SET_ITEMS } from './ItemsActions';

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
    default:
      return state;
  }
}

export default itemsReducer;
