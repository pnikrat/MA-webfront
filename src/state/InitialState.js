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
  }
};

export default initialState;
