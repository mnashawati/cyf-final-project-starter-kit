
import getStudentDataReducer from "./fetchReducer";
import postDataReducer from "./postReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
	allData: getStudentDataReducer,
	postData: postDataReducer,
});

export default allReducers;