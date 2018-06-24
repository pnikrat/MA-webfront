import { OPEN_DELETE_LIST_MODAL, OPEN_EDIT_ITEM_MODAL, CLOSE_MODAL,
  OPEN_DELETE_GROUP_MODAL, OPEN_EDIT_LIST_MODAL } from './constants';

const openDeleteListModal = (e, id) => {
  e.stopPropagation(); // prevents overlapping onClick events
  return { type: OPEN_DELETE_LIST_MODAL, payload: id };
};
const openEditListModal = (e, list) => {
  e.stopPropagation();
  return { type: OPEN_EDIT_LIST_MODAL, payload: list };
};

const closeModal = () => ({ type: CLOSE_MODAL });

const openEditItemModal = item => ({ type: OPEN_EDIT_ITEM_MODAL, payload: item });

const openDeleteGroupModal = (e, id) => {
  e.stopPropagation();
  return { type: OPEN_DELETE_GROUP_MODAL, payload: id };
};

function modalsReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_DELETE_LIST_MODAL:
      return Object.assign({}, state, {
        ...state,
        deleteList: { isOpen: true, id: action.payload },
      });
    case OPEN_EDIT_LIST_MODAL:
      return Object.assign({}, state, {
        ...state,
        editList: { isOpen: true, list: action.payload },
      });
    case OPEN_DELETE_GROUP_MODAL:
      return Object.assign({}, state, {
        ...state,
        deleteGroup: { isOpen: true, id: action.payload },
      });
    case OPEN_EDIT_ITEM_MODAL:
      return Object.assign({}, state, {
        ...state,
        editItem: { isOpen: true, item: action.payload },
      });
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        deleteList: { isOpen: false, id: null },
        editList: { isOpen: false, id: null },
        editItem: { isOpen: false, item: null },
        deleteGroup: { isOpen: false, id: null },
      });
    default:
      return state;
  }
}

export {
  openDeleteListModal,
  openEditListModal,
  closeModal,
  openEditItemModal,
  openDeleteGroupModal,
  modalsReducer
};
