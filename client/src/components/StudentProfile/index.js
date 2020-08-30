/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Navbar from "../Navbar/index.js";
import AreasOfFocus from "../AreasOfFocus/index.js";
import FeedbackForm from "../FeedbackForm/index.js";
import PreviousFeedback from "../PreviousFeedback";


const StudentProfile = () => {
	const params = useParams();
	const [student, setStudent] = useState({});

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => {
				setStudent(data.find((student) => student.name === params.name));
			})
			.catch((err) => console.log(err));
	}
	, []);


	return  (
		<>
			<Navbar />
			<div className="student-profile-container">
				<div className="student-profile-section-left">
					<div className="student-image-section">
						<img
							className="full-profile-picture"
							src={student.profile_pic_url}
						/>
					</div>
					<div className="student-info-section">
						<p className="student-profile-name">
							{student.name}
						</p>
						<p className="student-profile-city">
							{student.city}
						</p>
						<div className="email-github-section">
							<p className="student-profile-email">
							 {student.email}
							</p>
							<p className="student-profile-github">
								{student.gitHub_username}
							</p>
						</div>
					</div>
				</div>
				<div className="student-profile-container-right">
					<AreasOfFocus student={student} />
					<FeedbackForm student={student} />
					<PreviousFeedback student={student} />
				</div>
			</div>
		</>
	);
};

export default StudentProfile;