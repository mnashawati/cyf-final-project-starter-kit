/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const StudentCard = ({ student }) => {
	return (
		<Link
			className="student-card"
			to={{
				pathname:`/students/${student.name}`,
			}}>
			<div >
				<div>
					<img className="profile-picture" src={student.profile_pic_url} alt="student" />
				</div>
				<div>
					<p><b>Name:</b> {student.name}</p>
					<p><b>Email:</b> {student.email}</p>
					<p><b>City:</b> {student.city}</p>
				</div>
			</div>
		</Link>
	);
};

export default StudentCard;