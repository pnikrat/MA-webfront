import { SET_GROUPS, ADD_GROUP, SET_CURRENT_GROUP, UPDATE_GROUP } from '../state/constants';

function groupsReducer(state = {}, action) {
  switch (action.type) {
    case SET_GROUPS:
      return Object.assign({}, state, {
        currentGroup: state.currentGroup,
        groups: action.groups
      });
    case ADD_GROUP:
      return Object.assign({}, state, {
        currentGroup: state.currentGroup,
        groups: [...state.groups, action.group]
      });
    case UPDATE_GROUP:
      return Object.assign({}, state, {
        currentGroup: state.currentGroup,
        groups: state.groups.map((g) => {
          return (g.id === action.payload.id) ? { ...g, ...action.payload } : g;
        })
      });
    case SET_CURRENT_GROUP:
      return Object.assign({}, state, {
        currentGroup: action.group,
        groups: state.groups,
      });
    default:
      return state;
  }
}

export default groupsReducer;
