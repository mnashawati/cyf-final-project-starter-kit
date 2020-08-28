/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Navbar from "../Navbar/index.js";
import AreasOfFocus from "../AreasOfFocus/index.js";
import { StudentsContext } from "../../contexts/StudentsContext";
// import FeedbackForm from "./FeedbackForm";

const StudentProfile = () => {
	const params = useParams();

	const { students } = useContext(StudentsContext);

	function isStudent(student) {
		return student.name === params.name;
	}

	const student = students.find(isStudent);

	console.log(student);

	return (
		<>
			<Navbar />
			<div className="student-profile-container">
				<div className="student-profile-section-left">
					<div className="student-image-section">
						<img className="full-profile-picture" src={student.profile_pic_url} />
					</div>
					<div className="student-info-section">
						<p><b>Name:</b> {student.name} </p>
						<p><b>Email:</b> {student.email}</p>
						<p><b>City:</b> {student.city}</p>
					</div>
				</div>
				<div className="studen-profile-container-right">
					<AreasOfFocus />
				</div>

				{/* <div className="feedback-section">
				<p className="previous-feedback"><b>Previous feedback:</b> <br></br>
					{student.previousFeedback}</p>
			</div>

			<FeedbackForm /> */}
			</div>
		</>
	);
};

export default StudentProfile;