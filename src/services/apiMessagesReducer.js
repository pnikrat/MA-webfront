import { SET_API_ERROR, REMOVE_API_ERROR } from '../state/constants';

function apiMessagesReducer(state = {}, action) {
  switch (action.type) {
    case SET_API_ERROR:
      return Object.assign({}, state, {
        apiError: action.payload,
      });
    case REMOVE_API_ERROR:
      return Object.assign({}, state, {
        apiError: null,
      });
    default:
      return state;
  }
}

export default apiMessagesReducer;
