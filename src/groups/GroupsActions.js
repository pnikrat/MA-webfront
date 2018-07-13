import { push } from 'react-router-redux';
import { SET_GROUPS, ADD_GROUP, SET_CURRENT_GROUP,
  UPDATE_GROUP, DELETE_GROUP, GET } from '../state/constants';
import { apiSetSuccess, apiCall } from '../services/apiActions';

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

function updateGroup(response) {
  return {
    type: UPDATE_GROUP,
    payload: response.data,
  };
}

function deleteGroup(id) {
  return {
    type: DELETE_GROUP,
    payload: id,
  };
}

function addGroupAndRedirectBack(response) {
  return (dispatch) => {
    dispatch(push('/groups'));
    dispatch(addGroup(response));
  };
}

function updateGroupAndRedirectBack(response) {
  return (dispatch) => {
    dispatch(push('/groups'));
    dispatch(updateGroup(response));
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
    dispatch(push(`/groups/${id}/edit`));
    dispatch(setCurrentGroup(response));
  };
}

function showGroupWithFlash(flash) {
  return response =>
    (dispatch) => {
      const { id } = response.data;
      dispatch(setCurrentGroup(response));
      dispatch(push(`/groups/${id}`));
      dispatch(apiSetSuccess([flash]));
    };
}

function redirectBack(response) {
  return (dispatch) => {
    const { invitable_id: groupId, recipient_id: inviteeId } = response.data;
    const successMessage = inviteeId ? 'User has been added to group' : 'Invitation successfully sent';
    dispatch(apiCall(`/groups/${groupId}`, showGroupWithFlash(successMessage), GET));
  };
}

export {
  setGroups, addGroupAndRedirectBack, showGroup, editGroup,
  updateGroupAndRedirectBack, deleteGroup, redirectBack,
};
