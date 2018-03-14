const SET_LISTS = 'SET_LISTS';
const ADD_LIST = 'ADD_LIST';
const REMOVE_LIST = 'REMOVE_LIST';

function setLists(lists) {
  return {
    type: SET_LISTS,
    lists,
  };
}

function addList(list) {
  return {
    type: ADD_LIST,
    list,
  };
}

function removeList(id) {
  return {
    type: REMOVE_LIST,
    payload: id,
  };
}

function listsReducer(state = [], action) {
  switch (action.type) {
    case SET_LISTS:
      return Object.assign({}, state, {
        lists: action.lists
      });
    case ADD_LIST:
      return Object.assign({}, state, {
        lists: [
          ...state.lists,
          action.list
        ]
      });
    case REMOVE_LIST:
      return Object.assign({}, state, {
        lists: state.lists.filter(item => item.id !== action.payload)
      });
    default:
      return state;
  }
}

export {
  setLists,
  addList,
  removeList,
  listsReducer
};
