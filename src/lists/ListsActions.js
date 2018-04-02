import { SET_LISTS, ADD_LIST, REMOVE_LIST } from '../state/constants';

function setLists(response) {
  return {
    type: SET_LISTS,
    lists: response.data,
  };
}

function addList(response) {
  return {
    type: ADD_LIST,
    list: response.data,
  };
}

function removeList(id) {
  return {
    type: REMOVE_LIST,
    payload: id,
  };
}

export {
  setLists,
  addList,
  removeList,
};
