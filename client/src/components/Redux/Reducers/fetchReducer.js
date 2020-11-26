
const initialSate = { students : [] };

const getStudentDataReducer = (state =  { ...initialSate } , action) => {
	switch (action.type) {
	case "GET_STUDENTS_DATA":
		console.log({ action });
		return { ...state, students: action.payload };
	default:
		return state;
	}
};

export default getStudentDataReducer;



