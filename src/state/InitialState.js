const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null,
        lastName: null,
        id: null,
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
    deleteList: {
      isOpen: false,
      id: null,
    },
    editItem: {
      isOpen: false,
      item: null,
    },
    deleteGroup: {
      isOpen: false,
      id: null,
    },
  },
  apiErrorReducer: {
    apiError: null,
  },
  apiLoadingReducer: {
    loading: false,
    isFetching: false,
  },
  searchReducer: {
    open: false,
    results: [],
    value: '',
    cursor: 0,
  },
  groupsReducer: {
    groups: [],
    currentGroup: null,
  }
};

export default initialState;
