const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const TOGGLE_ITEM = 'TOGGLE_ITEM';

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
  SET_CURRENT_LIST,
  SET_ITEMS,
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  setCurrentList,
  setItems,
  addItem,
  removeItem,
  toggleItem,
};
