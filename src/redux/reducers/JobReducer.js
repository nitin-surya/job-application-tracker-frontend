const initialState = {
  data: [],
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // add leading zero if needed
  const day = date.getUTCDate().toString().padStart(2, "0"); // add leading zero if needed
  const year = date.getUTCFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

const formatData = (data) => {
  data = data
    .map((item, index) => {
      return {
        ...item,
        dateApplied: formatDate(item.dateApplied),
        sno: index + 1,
      };
    })
    .reverse();
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
