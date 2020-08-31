import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Navbar from "../Navbar/index.js";
import AreasOfFocus from "../AreasOfFocus/index.js";
import FeedbackFormContainer from "../FeedbackFormContainer/index.js";


const StudentProfile = () => {

	const params = useParams();
	const [student, setStudent] = useState({});
	console.log(params);
	useEffect(() => {
		fetch(`/api/students/${params.id}`)
			.then((res) => res.json())
			.then((data) => {
				setStudent(data);
			})
			.catch((err) => console.log(err));
	}
	, []);

	console.log({ student });

	return  Object.keys(student).length ? (
		<>
			<Navbar />
			<div className="student-profile-container">
				<div className="student-profile-section-left">
					<div className="student-image-section">
						<img
							className="full-profile-picture"
							src={student.profile_pic_url}
							alt="Student-profile"
						/>
					</div>
					<div className="student-info-section">
						<p>
							<b>Name:</b> {student.name}{" "}
						</p>
						<p>
							<b>Email:</b> {student.email}
						</p>
						<p>
							<b>City:</b> {student.city}
						</p>
					</div>
				</div>
				<div className="student-profile-container-right">
					<AreasOfFocus student={student} />
					<FeedbackFormContainer student={student} />
				</div>
			</div>
		</>
	) : null;
};

export default StudentProfile;