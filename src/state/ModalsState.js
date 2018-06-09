import { OPEN_LISTS_MODAL, OPEN_EDIT_ITEM_MODAL, CLOSE_MODAL } from './constants';

const openListsModal = (e, id) => {
  e.stopPropagation(); // prevents overlapping onClick events
  return { type: OPEN_LISTS_MODAL, payload: id };
};
const closeModal = () => ({ type: CLOSE_MODAL });

const openEditItemModal = item => ({ type: OPEN_EDIT_ITEM_MODAL, payload: item });

function modalsReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_LISTS_MODAL:
      return Object.assign({}, state, {
        ...state,
        lists: { isOpen: true, id: action.payload },
      });
    case OPEN_EDIT_ITEM_MODAL:
      return Object.assign({}, state, {
        ...state,
        editItems: { isOpen: true, item: action.payload },
      });
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        lists: { isOpen: false, id: null },
        editItems: { isOpen: false, item: null },
      });
    default:
      return state;
  }
}

export {
  openListsModal,
  closeModal,
  openEditItemModal,
  modalsReducer
};
