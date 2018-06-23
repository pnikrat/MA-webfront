import { SET_GROUPS } from '../state/constants';

function setGroups(response) {
  return {
    type: SET_GROUPS,
    groups: response.data,
  };
}

export {
  setGroups,
};
