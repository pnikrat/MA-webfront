import { SET_CURRENT_LIST, SET_ITEMS,
  ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from '../state/constants';

function setCurrentList(list) {
  return {
    type: SET_CURRENT_LIST,
    list,
  };
}

function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  };
}

function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    payload: id,
  };
}

function toggleItem(id) {
  return {
    type: TOGGLE_ITEM,
    payload: id,
  };
}

export {
  setCurrentList,
  setItems,
  addItem,
  removeItem,
  toggleItem,
};
