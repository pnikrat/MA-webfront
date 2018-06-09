import {
  SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE, SET_SEARCH_MENU_VISIBILITY, CHANGE_FOCUS,
} from '../state/constants';

function searchReducer(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, {
        open: action.payload.length > 0,
        results: action.payload === null ? [] : action.payload,
        cursor: 0,
      });
    case SET_SEARCH_FIELD_VALUE:
      return Object.assign({}, state, {
        open: state.results.length > 0,
        value: action.value,
      });
    case SET_SEARCH_MENU_VISIBILITY:
      return Object.assign({}, state, {
        open: action.value,
        results: action.value ? state.results : [],
        cursor: 0,
      });
    case CHANGE_FOCUS:
      return Object.assign({}, state, {
        cursor: action.value,
      });
    default:
      return state;
  }
}

export default searchReducer;
