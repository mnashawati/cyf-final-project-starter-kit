import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StudentCard = ({ student }) => {
	return (
		<Link
			className="student-card"
			to={{ pathname:`/regions/${student.city}/students/${student.name}` }}
		>
			<div >
				<div>
					<img className="profile-picture" src={student.profile_pic_url} alt="student" />
				</div>
				<div className="student-card-details">
					<p className="student-card-name"> {student.name}</p>

					<div className="email-icon-section">
						<img src="https://img.icons8.com/material-rounded/24/000000/important-mail.png" alt="email-icon" />
						<p className="student-profile-email-card"> {student.email}</p>
					</div>
					<div className="github-icon-section">
						<img src="https://img.icons8.com/material-outlined/24/000000/github.png" alt="github-icon" />
						<p className="student-profile-github">{student.gitHub_username}</p>
					</div>
					{/* <p className="student-card-email"><b>Email:</b> {student.email}</p>
					<p className="student-card-github"><b>GitHub:</b> {student.gitHub_username}</p> */}
				</div>
			</div>
		</Link>
	);
};

StudentCard.propTypes = {
	student: PropTypes.object.isRequired,
};

export default StudentCard;