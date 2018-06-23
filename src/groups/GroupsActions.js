import { push } from 'react-router-redux';
import { SET_GROUPS, ADD_GROUP } from '../state/constants';

function setGroups(response) {
  return {
    type: SET_GROUPS,
    groups: response.data,
  };
}

function addGroup(response) {
  return {
    type: ADD_GROUP,
    group: response.data,
  };
}

function addGroupAndRedirectBack(response) {
  return (dispatch) => {
    dispatch(addGroup(response));
    dispatch(push('/groups'));
  };
}

export {
  setGroups, addGroupAndRedirectBack
};
