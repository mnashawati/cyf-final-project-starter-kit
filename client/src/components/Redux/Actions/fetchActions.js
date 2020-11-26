
export const fetchData = () => {
	console.log("testAction");
	return (dispatch) => {

		fetch("/api/students")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				dispatch({
					type: "FETCH_DATA",
					payload: data,
				});
			})
			.catch((err) => console.log(err));
	};
};