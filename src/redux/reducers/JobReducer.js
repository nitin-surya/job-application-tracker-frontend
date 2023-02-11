const initialState = {
  data: [],
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_JOBS":
      return {
        ...state,
        data: action.payload,
      };

    case "ADD_JOB":
      return {
        ...state,
        data: action.payload,
      };

    case "EDIT_JOB":
      return {
        ...state,
        data: action.payload,
      };

    case "DELETE_JOB":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default jobReducer;
