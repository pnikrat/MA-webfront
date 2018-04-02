import { API_CALL, API_START, API_STOP, SET_API_ERROR, REMOVE_API_ERROR } from '../state/constants';

function apiCall(url, success, method, data = {}) {
  return {
    type: API_CALL,
    payload: {
      url,
      method,
      data,
    },
    meta: {
      api: true,
      success
    }
  };
}

function apiStart() {
  return {
    type: API_START,
  };
}

function apiStop() {
  return {
    type: API_STOP,
  };
}

function apiThrowError(error) {
  return {
    type: SET_API_ERROR,
    payload: error,
  };
}

function apiRemoveError() {
  return {
    type: REMOVE_API_ERROR,
  };
}

export {
  apiCall,
  apiStart,
  apiStop,
  apiThrowError,
  apiRemoveError,
};
