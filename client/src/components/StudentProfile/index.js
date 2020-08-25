/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Navbar from "../Navbar/index.js";
import AreasOfFocus from "../AreasOfFocus/index.js";
// import FeedbackForm from "./FeedbackForm";

const StudentProfile = () => {
	const params = useParams();
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
		<>
			<Navbar />
			<div className="studen-profile-container">
				<div className="student-profile-section-left">
					<div className="student-image-section">
						<img className="full-profile-picture" src={student.image} />
					</div>
					<div className="student-info-section">
						<p><b>Name:</b> {student.username} </p>
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