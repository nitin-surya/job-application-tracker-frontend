import { combineReducers } from "redux";
import jobReducer from "../redux/reducers/JobReducer";
import spinnerReducer from "../redux/reducers/SpinnerReducer";
import authReducer from "./reducers/AuthReducer";
import themeReducer from "./reducers/ThemeReducer";
import dashboardReducer from "./reducers/DashboardReducer";

const rootReducer = combineReducers({
  jobReducer: jobReducer,
  spinnerReducer: spinnerReducer,
  authReducer: authReducer,
  themeReducer: themeReducer,
  dashboardReducer: dashboardReducer,
});

export default rootReducer;
