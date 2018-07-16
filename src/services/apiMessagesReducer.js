import { SET_API_ERROR, REMOVE_API_ERROR,
  SET_API_SUCCESS, REMOVE_API_SUCCESS } from '../state/constants';

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
    case SET_API_SUCCESS:
      return Object.assign({}, state, {
        apiSuccess: action.payload,
      });
    case REMOVE_API_SUCCESS:
      return Object.assign({}, state, {
        apiSuccess: null,
      });
    default:
      return state;
  }
}

export default apiMessagesReducer;
