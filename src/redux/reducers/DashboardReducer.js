import {
  GET_THIS_WEEK_DATA,
  GET_THIS_MONTH_DATA,
  GET_YEARLY_DATA,
  GET_LAST_30_DAYS_DATA,
  GET_LAST_7_DAYS_DATA,
  GET_TODAY_DATA,
} from "../../constants/ActionTypes";

const initialState = {
  yearlyData: [],
  thisMonthData: [],
  thisWeekData: [],
  last30DaysData: [],
  last7daysData: [],
  todayData: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THIS_WEEK_DATA:
      return {
        ...state,
        isAuthenticated: true,
        yearlyData: action.payload,
      };
    case GET_THIS_MONTH_DATA:
      return {
        ...state,
        isAuthenticated: true,
        thisMonthData: action.payload,
      };
    case GET_YEARLY_DATA:
      return {
        ...state,
        isAuthenticated: true,
        yearlyData: action.payload,
      };
    case GET_LAST_30_DAYS_DATA:
      return {
        ...state,
        isAuthenticated: true,
        last30DaysData: action.payload,
      };
    case GET_LAST_7_DAYS_DATA:
      return {
        ...state,
        isAuthenticated: true,
        last7daysData: action.payload,
      };
    case GET_TODAY_DATA:
      return {
        ...state,
        isAuthenticated: true,
        todayData: action.payload,
      };
    default:
      return state;
  }
};
export default dashboardReducer;
