/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./studentProfile.css";
import Navbar from "./Navbar.js";

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
					<div className="area-of-focus-section">
						<h3 className="area-of-focus-title">Areas of focus</h3>
						<div className="need-to-work-on-section">
							<h3 className="subtitle-text">
								Need to work on...
							</h3>
							<div className="area-text-section-red">
								<button className="dummy-button">CSS</button>
							</div>
						</div>
						<div className="okay-at-section">
							<h3 className="subtitle-text">
								Okay at...
							</h3>
							<div className="area-text-section-yellow">
								<button className="dummy-button">CSS</button>
							</div>
						</div>
						<div className="good-at-section">
							<h3 className="subtitle-text">
								Good at...
							</h3>
							<div className="area-text-section-green">
								<button className="dummy-button">CSS</button>
							</div>
						</div>
					</div>
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