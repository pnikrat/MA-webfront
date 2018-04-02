import apiService from '../services/api';
import { apiStart, apiStop, apiThrowError, apiRemoveError } from './apiActions';

const apiMiddleware = ({ dispatch }) => next => (action) => {
  const { api } = action.meta || false;
  if (api !== true) {
    return next(action);
  }

  dispatch(apiStart());

  const { payload } = action;
  const { success } = action.meta;
  return apiService.call(payload).then((response) => {
    dispatch(apiStop());
    dispatch(apiRemoveError());
    dispatch(success(response));
  }).catch((error) => {
    dispatch(apiStop());
    dispatch(apiThrowError(error.message));
  });
};

export default apiMiddleware;
