const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null,
        lastName: null,
      },
    },
  },
  listsReducer: {
    lists: [],
  },
  itemsReducer: {
    currentList: null,
    items: [],
  },
  modalsReducer: {
    lists: {
      isOpen: false,
    },
  }
};

export default initialState;
