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
      id: null,
    },
    editItems: {
      isOpen: false,
      item: null,
    }
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
  }
};

export default initialState;
