
// const updateStudentDataReducer = (state={ test:"test" }, action) => {
// 	switch (action.type) {
// 	case "UPDATE_STUDENTS_DATA":
// 		//NEED UPDATE to POST
// 		return { ...state, students: action.payload };

// 	default:
// 		return state;
// 	}
// };

// export default updateStudentDataReducer;

const initialSate = { student: {} };

const updateStudentDataReducer = (state = { ...initialSate }, action) => {
	switch (action.type) {
	case "UPDATE_STUDENT_DATA":
		return { ...state, student: action.payload };
	default:
		return state;
	}
};

export default updateStudentDataReducer;