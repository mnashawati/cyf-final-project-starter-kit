import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Navbar from "../Navbar/index.js";
import { Link } from "react-router-dom";
import AreasOfFocus from "../AreasOfFocus/index.js";
import AllFeedback from "../AllFeedback/index.js";

const StudentProfile = () => {

	const params = useParams();

	const [student, setStudent] = useState({});
	useEffect(() => {
		fetch("/api/students")
			.then((res) => res.json())
			.then((data) => setStudent(data.find((student) => student.name == params.studentName)))
			.catch((err) => console.log(err));
	},[]);

	return  Object.keys(student).length ? (
		<>
			<Navbar />
			<Link
				className="students-route-link"
				to={{ pathname: `/regions/${student.city}/students` }}
			>
				<p className="back-to-students">...Back to students</p>
			</Link>
			<div className="student-profile-container">
				<div className="student-profile-section-left">
					<div className="student-image-section">
						<img className="full-profile-picture" src={student.profile_pic_url} alt="Student-profile" />
					</div>
					<div className="student-info-section">
						<p className="student-profile-name">{student.name}</p>
						<p className="student-profile-city">{student.city}</p>
						<div className="email-github-section">
							<div className="email-icon-section">
								<img src="https://img.icons8.com/material-rounded/24/000000/important-mail.png" alt="email-icon" />
								<p className="student-profile-email"> {student.email}</p>
							</div>
							<div className="github-icon-section">
								<img src="https://img.icons8.com/material-outlined/24/000000/github.png" alt="github-icon" />
								<p className="student-profile-github">{student.gitHub_username}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="student-profile-container-right">
					<AreasOfFocus student={student} />
					<AllFeedback student={student} />
				</div>
			</div>
		</>
	) : null;
};

export default StudentProfile;