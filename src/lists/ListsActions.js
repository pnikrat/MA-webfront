import { SET_LISTS, ADD_LIST, REMOVE_LIST } from '../state/constants';

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
};
