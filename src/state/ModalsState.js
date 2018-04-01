import { OPEN_LISTS_MODAL, CLOSE_LISTS_MODAL } from './constants';

const openListsModal = (e, id) => {
  e.stopPropagation(); // prevents overlapping onClick events
  return { type: OPEN_LISTS_MODAL, payload: id };
};
const closeListsModal = () => ({ type: CLOSE_LISTS_MODAL });

function modalsReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_LISTS_MODAL:
      return Object.assign({}, state, {
        lists: { isOpen: true, id: action.payload }
      });
    case CLOSE_LISTS_MODAL:
      return Object.assign({}, state, {
        lists: { isOpen: false, id: null }
      });
    default:
      return state;
  }
}

export {
  openListsModal,
  closeListsModal,
  modalsReducer
};
