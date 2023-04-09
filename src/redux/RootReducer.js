import { combineReducers } from "redux";
import jobReducer from "../redux/reducers/JobReducer";
import spinnerReducer from "../redux/reducers/SpinnerReducer";

const rootReducer = combineReducers({
  jobReducer: jobReducer,
  spinnerReducer: spinnerReducer,
});

export default rootReducer;
