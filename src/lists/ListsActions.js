const SET_LISTS = 'SET_LISTS';
const ADD_LIST = 'ADD_LIST';
const REMOVE_LIST = 'REMOVE_LIST';

function setLists(lists) {
  return {
    type: SET_LISTS,
    lists
  };
}

function addList(list) {
  return {
    type: ADD_LIST,
    list
  };
}

function removeList(id) {
  return {
    type: REMOVE_LIST,
    payload: id
  };
}

export {
  setLists,
  addList,
  removeList,
  SET_LISTS,
  ADD_LIST,
  REMOVE_LIST,
};
