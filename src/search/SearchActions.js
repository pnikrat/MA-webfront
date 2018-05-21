import {
  SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE, SET_SEARCH_MENU_VISIBILITY, CHANGE_FOCUS
} from '../state/constants';

function setSearchResults(response) {
  return {
    type: SET_SEARCH_RESULTS,
    payload: response.data,
  };
}

function setSearchFieldValue(value) {
  return {
    type: SET_SEARCH_FIELD_VALUE,
    value,
  };
}

function setSearchMenuVisibility(value) {
  return {
    type: SET_SEARCH_MENU_VISIBILITY,
    value,
  };
}

function changeSearchResultFocus(value) {
  return {
    type: CHANGE_FOCUS,
    value,
  };
}

export {
  setSearchResults,
  setSearchFieldValue,
  setSearchMenuVisibility,
  changeSearchResultFocus,
};
