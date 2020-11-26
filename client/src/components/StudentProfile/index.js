import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudentData } from "../Redux/Actions/studentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Highlights from "../Highlights/index.js";
import AllFeedback from "../AllFeedback/index.js";

import "./styles.css";

const StudentProfile = ({ students, getStudentData }) => {
	const params = useParams();

	useEffect(() => {
		getStudentData();
	}, []);

	const student
        = students
        && students.length
        && students.find((student) => student.name == params.studentName);

	return (
		Object.keys(student).length && (
			<>
				<div className="container student-profile-wrapper">
					<div className="student-hero-section">
						<div className="student-image-section">
							<img
								className="full-profile-picture"
								src={student.profile_pic_url}
								alt="Student-profile"
							/>
						</div>
						<div className="email-github-section">
							<div className="student-name-city">
								<p className="student-profile-name">
									{student.name}
								</p>
							</div>
							<div>
								<div className="github-icon-section">
									<span>
										<img
											src="https://img.icons8.com/material-outlined/24/000000/github.png"
											alt="github-icon"
										/>
									</span>
									<span className="student-profile-github">
										{student.gitHub_username}
									</span>
								</div>
								<div className="email-icon-section">
									<span>
										<img
											src="https://img.icons8.com/material-rounded/24/000000/important-mail.png"
											alt="email-icon"
										/>
									</span>
									<span className="student-profile-email">
										{student.email}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="student-highlights-feedback-section">
						<div className="student-profile-container-left">
							<Highlights student={student} />
						</div>
						<div className="student-profile-container-right">
							<AllFeedback student={student} />
						</div>
					</div>
				</div>
			</>
		)
	);
};

const mapStateToProps = (state) => {
	const { students } = state.allData;
	console.log(students);
	return { students };
};

const mapDispatchToProps = {
	getStudentData,
};

StudentProfile.propTypes = {
	students: PropTypes.array,
	getStudentData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);

