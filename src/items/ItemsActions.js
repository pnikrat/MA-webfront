import { SET_CURRENT_LIST, SET_ITEMS,
  ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM, SET_SEARCH_RESULTS,
  SET_SEARCH_FIELD_VALUE, GET } from '../state/constants';
import { apiCall } from '../services/apiActions';


function setCurrentList(response) {
  return {
    type: SET_CURRENT_LIST,
    list: response.data,
  };
}

function setItems(response) {
  return {
    type: SET_ITEMS,
    items: response.data,
  };
}

function setCurrentListAndFetchItems(response) {
  return (dispatch) => {
    const { id } = response.data;
    dispatch(setCurrentList(response));
    dispatch(apiCall(`/lists/${id}/items`, setItems, GET));
  };
}

function addItem(response) {
  return {
    type: ADD_ITEM,
    item: response.data,
  };
}

function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    payload: id,
  };
}

function toggleItem(response) {
  return {
    type: TOGGLE_ITEM,
    payload: response.data,
  };
}

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

export {
  setCurrentList,
  setItems,
  setCurrentListAndFetchItems,
  addItem,
  removeItem,
  toggleItem,
  setSearchResults,
  setSearchFieldValue,
};
