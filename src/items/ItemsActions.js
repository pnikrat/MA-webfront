const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
const SET_ITEMS = 'SET_ITEMS';

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

export {
  SET_CURRENT_LIST,
  SET_ITEMS,
  setCurrentList,
  setItems,
};
