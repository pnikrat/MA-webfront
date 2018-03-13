const OPEN_LISTS_MODAL = 'OPEN_LISTS_MODAL';
const CLOSE_LISTS_MODAL = 'CLOSE_LISTS_MODAL';

const openListsModal = () => ({ type: OPEN_LISTS_MODAL });
const closeListsModal = () => ({ type: CLOSE_LISTS_MODAL });

function modalsReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_LISTS_MODAL:
      return Object.assign({}, state, {
        lists: { isOpen: true }
      });
    case CLOSE_LISTS_MODAL:
      return Object.assign({}, state, {
        lists: { isOpen: false }
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
