import { combineReducers } from "redux";
import jobReducer from "../redux/reducers/JobReducer";
import spinnerReducer from "../redux/reducers/SpinnerReducer";
import authReducer from "./reducers/AuthReducer";
import themeReducer from "./reducers/ThemeReducer";

const rootReducer = combineReducers({
  jobReducer: jobReducer,
  spinnerReducer: spinnerReducer,
  authReducer: authReducer,
  themeReducer: themeReducer,
});

export default rootReducer;
