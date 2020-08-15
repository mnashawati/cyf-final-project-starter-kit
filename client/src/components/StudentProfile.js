import React from "react";
import { useParams } from "react-router-dom";
import students from "../db/students.json";
import "./studentsGrid.css";
import FeedbackForm from "./FeedbackForm";
const StudentProfile = () => {

	const params = useParams();
	console.log(params);

	const student = students.find((student) => student.name === params.name.replace("-", " "));

	return (
		<div>
			<div className="profile-info">
				<div>
					<p><b>Name:</b> {student.name} </p>
					<p><b>Email:</b> {student.email}</p>
					<p><b>City:</b> {student.city}</p>
				</div>
				<div>
					<img className="full-profile-picture" src={student.image} />
				</div>
			</div>
			<div>
				<p className="previous-feedback"><b>Previous feedback:</b> <br></br>
					{student.previousFeedback}</p>
			</div>

			<FeedbackForm />
		</div>
	);
};

export default StudentProfile;