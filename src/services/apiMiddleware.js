import call from '../services/api';
import { apiStart, apiStop, apiThrowError, apiRemoveError, apiShowLoading } from './apiActions';

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
    dispatch(apiRemoveError());
    dispatch(success(response));
  }).catch((error) => {
    dispatch(apiStop());
    const { errors } = error.response.data;
    dispatch(apiThrowError(errors));
  });
};

export default apiMiddleware;
