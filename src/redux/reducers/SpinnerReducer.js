const initialState = {
  isLoading: false,
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_SPINNER":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "STOP_SPINNER":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default spinnerReducer;
