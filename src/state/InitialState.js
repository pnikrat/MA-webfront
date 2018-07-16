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
    editList: {
      isOpen: false,
      list: null,
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
  apiMessagesReducer: {
    apiError: null,
    apiSuccess: null,
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
    currentGroup: {},
  }
};

export default initialState;
