import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

const StudentCard = ({ student }) => {
	return (
		<Link
			className="student-card-wrapper"
			to={{ pathname:`/regions/${student.city}/students/${student.name}` }}
		>
			<div>
				<img className="profile-picture" src={student.profile_pic_url} alt="student" />
			</div>
			<div className="student-card-details">
				<div className="student-card-name-container">
					<h2 className="student-card-name">{student.name}</h2>
				</div>
				<p className="student-card-city"><strong>City: </strong>{student.city}</p>
				<p className="student-card-class"><strong>Class: </strong> {student.class}</p>
			</div>
		</Link>
	);
};

StudentCard.propTypes = {
	student: PropTypes.object.isRequired,
};

export default StudentCard;