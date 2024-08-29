import axios from "../../axios.js";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  START_SPINNER,
  STOP_SPINNER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../../constants/ActionTypes";
import { LOGIN_URL, REGISTER_URL } from "../../constants/API_URLS";

// Login User Action
export const loginUser = (userData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: START_SPINNER, payload: true });

    try {
      const res = await axios.post(LOGIN_URL, userData);

      // Store the token in local storage
      localStorage.setItem("token", res.data.accessToken);

      // Dispatch the LOGIN_SUCCESS action
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // Navigate to the home page after successful login
      navigate("/home");
      return { success: true, message: res.data.message }; // Return success and message
    } catch (err) {
      console.log("Login failed", err);

      // Dispatch the LOGIN_FAIL action with error information
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data || "Login failed",
      });
      return { success: false, message: err.response.data.message }; // Return success and message
    } finally {
      // Stop the spinner regardless of success or failure
      dispatch({ type: STOP_SPINNER, payload: false });
    }
  };
};

// Register User Action
export const registerUser = (userData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: START_SPINNER, payload: true });
    try {
      const res = await axios.post(REGISTER_URL, userData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch({ type: STOP_SPINNER, payload: false });
      return { success: true, message: res.data.message }; // Return success and message
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data || "Registration failed",
      });
      dispatch({ type: STOP_SPINNER, payload: false });
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      }; // Return failure and message
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };
};
