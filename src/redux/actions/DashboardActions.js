import axios from "../../axios";
import * as actionTypes from "../../constants/ActionTypes";
import * as urls from "../../constants/API_URLS";

export const getYearlyData = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.START_SPINNER, payload: true });
    axios
      .get(urls.YEARLY_URL)
      .then((res) => {
        dispatch({ type: actionTypes.GET_YEARLY_DATA, payload: res.data.data });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
        return res.data;
      })
      .catch((error) => {
        dispatch({ type: actionTypes.GET_YEARLY_DATA, payload: [] });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      });
  };
};
