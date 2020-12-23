
const initialState = { students : [] };


const studentsReducer = (state = { ...initialState }, action) => {
	switch (action.type) {
	case "GET_STUDENTS_DATA":
		return { ...state, students: action.payload };
	case "GET_STUDENT_DATA":
		return { ...state, student: action.payload };
	default:
		return state;
	}
};

export default studentsReducer;



