import { push } from 'react-router-redux';
import { SET_GROUPS, ADD_GROUP, SET_CURRENT_GROUP } from '../state/constants';

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

function setCurrentGroup(response) {
  return {
    type: SET_CURRENT_GROUP,
    group: response.data,
  };
}

function showGroup(response) {
  return (dispatch) => {
    const { id } = response.data;
    dispatch(setCurrentGroup(response));
    dispatch(push(`/groups/${id}`));
  };
}

function editGroup(response) {
  return (dispatch) => {
    const { id } = response.data;
    dispatch(setCurrentGroup(response));
    dispatch(push(`/groups/${id}/edit`));
  };
}

export {
  setGroups, addGroupAndRedirectBack, showGroup, editGroup,
};
