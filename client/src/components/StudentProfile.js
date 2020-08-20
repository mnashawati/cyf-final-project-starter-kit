import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./studentsGrid.css";
import FeedbackForm from "./FeedbackForm";
const StudentProfile = () => {

	const params = useParams();
	console.log(params);

	const [student, setStudent] = useState({});

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => {
				setStudent(data.find((student) => student.username === params.username));
			})
			.catch((err) => console.log(err));
	}
	, []);


	return (
		<div>
			<div className="profile-info">
				<div>
					<p><b>Name:</b> {student.username} </p>
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