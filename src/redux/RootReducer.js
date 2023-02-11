import { combineReducers } from "redux";
import jobReducer from "../redux/reducers/JobReducer";

const rootReducer = combineReducers({
  jobReducer: jobReducer,
});

export default rootReducer;
