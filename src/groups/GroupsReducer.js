import { SET_GROUPS } from '../state/constants';

function groupsReducer(state = {}, action) {
  switch (action.type) {
    case SET_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups
      });
    default:
      return state;
  }
}

export default groupsReducer;
