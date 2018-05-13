import { SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE } from '../state/constants';

function searchReducer(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, {
        open: true,
        results: action.payload === null ? [] : action.payload,
      });
    case SET_SEARCH_FIELD_VALUE:
      return Object.assign({}, state, {
        open: action.value !== '',
        value: action.value,
      });
    default:
      return state;
  }
}

export default searchReducer;
