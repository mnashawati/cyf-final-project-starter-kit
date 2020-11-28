
import getStudentDataReducer from "./getStudentDataReducer";
import updateStudentDataReducer from "./updateStudentDataReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
	allData: getStudentDataReducer,
	updatedData: updateStudentDataReducer,
});

export default reducers;