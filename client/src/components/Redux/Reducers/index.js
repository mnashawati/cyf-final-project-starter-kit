
import fetchDataReducer from "./fetchReducer";
import postDataReducer from "./postReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
	allData: fetchDataReducer,
	postData: postDataReducer,
});

export default allReducers;