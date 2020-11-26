
const postDataReducer = (state={ test:"test" }, action) => {
	switch (action.type) {
	case "UPDATE_STUDENTS_DATA":
		//NEED UPDATE to POST
		return { ...state, students: action.payload };

	default:
		return state;
	}
};

export default postDataReducer;