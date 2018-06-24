import { apiRemoveError } from '../services/apiActions';
import { ROUTER_LOCATION_CHANGE } from '../state/constants';

const locationChangeMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === ROUTER_LOCATION_CHANGE) {
    dispatch(apiRemoveError());
  }
  return next(action);
};

export default locationChangeMiddleware;
