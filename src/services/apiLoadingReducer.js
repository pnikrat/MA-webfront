import { API_START, API_STOP, API_LOADING } from '../state/constants';

function apiLoadingReducer(state = {}, action) {
  switch (action.type) {
    case API_START:
      return Object.assign({}, state, {
        loading: false,
        isFetching: true,
      });
    case API_STOP:
      return Object.assign({}, state, {
        loading: false,
        isFetching: false,
      });
    case API_LOADING:
      return Object.assign({}, state, {
        loading: state.isFetching,
        isFetching: state.isFetching,
      });
    default:
      return state;
  }
}

export default apiLoadingReducer;
