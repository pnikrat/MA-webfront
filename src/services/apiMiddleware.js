import call from '../services/api';
import { apiStart, apiStop, apiThrowError, apiShowLoading, removeFlash } from './apiActions';

const apiMiddleware = ({ dispatch }) => next => (action) => {
  const { api } = action.meta || false;
  if (api !== true) {
    return next(action);
  }

  dispatch(apiStart());
  setTimeout(() => dispatch(apiShowLoading()), 1000);

  const { payload } = action;
  const { success } = action.meta;
  return call(payload).then((response) => {
    dispatch(apiStop());
    dispatch(removeFlash());
    dispatch(success(response));
  }).catch((error) => {
    dispatch(apiStop());
    let { errors } = error.response.data;
    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    dispatch(apiThrowError(errors));
  });
};

export default apiMiddleware;
