
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