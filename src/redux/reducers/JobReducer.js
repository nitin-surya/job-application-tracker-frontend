const initialState = {
  data: [],
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const formatData = (data) => {
  data = data.map((item) => {
    return {
      ...item,
      dateApplied: formatDate(item.dateApplied),
    };
  });
  return data;
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_JOBS":
      return {
        ...state,
        data: formatData(action.payload),
      };

    case "ADD_JOB":
      return {
        ...state,
        data: formatData(action.payload),
      };

    case "EDIT_JOB":
      return {
        ...state,
        data: formatData(action.payload),
      };

    case "DELETE_JOB":
      return {
        ...state,
        data: formatData(action.payload),
      };

    default:
      return state;
  }
};

export default jobReducer;
