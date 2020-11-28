
import studentsReducer from "./studentsReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
	studentsData: studentsReducer,
});

export default reducers;