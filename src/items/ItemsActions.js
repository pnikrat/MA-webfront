const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

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

export {
  SET_CURRENT_LIST,
  SET_ITEMS,
  ADD_ITEM,
  setCurrentList,
  setItems,
  addItem,
};
