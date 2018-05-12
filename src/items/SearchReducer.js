import { SET_SEARCH_RESULTS } from '../state/constants';

function mapToSearchResult(results) {
  return results.map((result) => {
    result.childKey = result.id;
    return result;
  });
}

function searchReducer(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, {
        open: true,
        results: action.payload === null ? [] : mapToSearchResult(action.payload),
      });
    default:
      return state;
  }
}

export default searchReducer;
