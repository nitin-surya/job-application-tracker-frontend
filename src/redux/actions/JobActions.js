import axios from "../../axios";
import * as actionTypes from "../../constants/ActionTypes";
import * as urls from "../../constants/API_URLS";

export const getAllYears = (year) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.START_SPINNER, payload: true });
    axios
      .get(urls.GET_YEARS)
      .then((res) => {
        dispatch({ type: actionTypes.GET_YEARS, payload: res.data.years });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.GET_YEARS, payload: [] });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      });
  };
};

export const getAllJobs = (year) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.START_SPINNER, payload: true });
    axios
      .get(`${urls.GET_ALL_JOBS}${year}`)
      .then((res) => {
        dispatch({ type: actionTypes.GET_ALL_JOBS, payload: res.data.data });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.GET_ALL_JOBS, payload: [] });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      });
  };
};

export const addJob = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.START_SPINNER, payload: true });

    axios
      .post(urls.ADD_JOB, data)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_JOB, payload: res.data.data });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
        return res.data.message;
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ADD_JOB, payload: [] });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
        return error.response.message;
      });
  };
};

export const editJob = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.START_SPINNER, payload: true });

    axios
      .put(urls.EDIT_JOB, data)
      .then((res) => {
        dispatch({ type: actionTypes.EDIT_JOB, payload: res.data.data });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.EDIT_JOB, payload: [] });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      });
  };
};

export const deleteJob = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.START_SPINNER, payload: true });

    axios
      .post(urls.DELETE_JOB, data)
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_JOB, payload: res.data.data });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.DELETE_JOB, payload: [] });
        dispatch({ type: actionTypes.STOP_SPINNER, payload: false });
      });
  };
};
