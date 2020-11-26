
const fetchDataReducer = (state =  {} , action) => {
	switch (action.type) {
	case "FETCH_DATA":
		console.log({ action });
		return { ...state,
			students: action.payload };
	default:
		return state;
	}
};

export default fetchDataReducer;



