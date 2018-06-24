import { SET_LISTS, ADD_LIST, REMOVE_LIST, EDIT_LIST } from '../state/constants';

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

function editList(response) {
  return {
    type: EDIT_LIST,
    payload: response.data,
  };
}

export {
  setLists,
  addList,
  editList,
  removeList,
};
