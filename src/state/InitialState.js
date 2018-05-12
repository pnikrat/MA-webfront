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
  }
};

export default initialState;
