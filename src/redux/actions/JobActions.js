import axios from "../../axios";
import * as actionTypes from "../../constants/ActionTypes";
import * as urls from "../../constants/API_URLS";

export const getAllJobs = () => {
  return (dispatch) => {
    axios
      .get(urls.GET_ALL_JOBS)
      .then((res) => {
        dispatch({ type: actionTypes.GET_ALL_JOBS, payload: res.data.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.GET_ALL_JOBS, payload: [] });
      });
  };
};

export const addJob = (data) => {
  console.log("add action", data);
  return (dispatch) => {
    axios
      .post(urls.ADD_JOB, data)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_JOB, payload: res.data.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ADD_JOB, payload: [] });
      });
  };
};

export const editJob = (data) => {
  return (dispatch) => {
    axios
      .put(urls.EDIT_JOB, data)
      .then((res) => {
        dispatch({ type: actionTypes.EDIT_JOB, payload: res.data.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.EDIT_JOB, payload: [] });
      });
  };
};

export const deleteJob = (data) => {
  return (dispatch) => {
    axios
      .post(urls.DELETE_JOB, data)
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_JOB, payload: res.data.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.DELETE_JOB, payload: [] });
      });
  };
};
