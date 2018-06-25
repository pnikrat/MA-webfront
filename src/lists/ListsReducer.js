import { SET_LISTS, ADD_LIST, REMOVE_LIST, EDIT_LIST } from '../state/constants';

function listsReducer(state = {}, action) {
  switch (action.type) {
    case SET_LISTS:
      return Object.assign({}, state, {
        lists: action.lists
      });
    case ADD_LIST:
      return Object.assign({}, state, {
        lists: [...state.lists, action.list]
      });
    case EDIT_LIST:
      return Object.assign({}, state, {
        lists: state.lists.map((i) => {
          return (i.id === action.payload.id) ? { ...i, ...action.payload } : i;
        })
      });
    case REMOVE_LIST:
      return Object.assign({}, state, {
        lists: state.lists.filter(item => item.id !== action.payload)
      });
    default:
      return state;
  }
}

export default listsReducer;
