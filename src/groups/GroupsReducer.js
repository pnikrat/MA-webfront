import { SET_GROUPS, ADD_GROUP } from '../state/constants';

function groupsReducer(state = {}, action) {
  switch (action.type) {
    case SET_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups
      });
    case ADD_GROUP:
      return Object.assign({}, state, {
        groups: [...state.groups, action.group]
      });
    default:
      return state;
  }
}

export default groupsReducer;
