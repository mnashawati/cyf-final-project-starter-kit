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
				<div>
					<p><b>Name:</b> {student.name}</p>
					<p><b>Email:</b> {student.email}</p>
					<p><b>GitHub:</b> {student.gitHub_username}</p>
				</div>
			</div>
		</Link>
	);
};

StudentCard.propTypes = {
	student: PropTypes.object.isRequired,
};

export default StudentCard;