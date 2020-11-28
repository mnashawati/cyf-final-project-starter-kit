
import { GET_STUDENTS_DATA, UPDATE_STUDENT_DATA } from "./types";

export const getStudentData = () => {

	return (dispatch) => {

		fetch("/api/students")
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: GET_STUDENTS_DATA,
					payload: data,
				});
			})
			.catch((err) => console.log(err));
	};
};

export const updateStudentData = (studentID) => {
	return (dispatch) => {
		fetch(`/api/students/${studentID}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				dispatch({
					type: UPDATE_STUDENT_DATA,
					payload: data,
				});
			})
			.catch((err) => console.log(err));
	};
};
