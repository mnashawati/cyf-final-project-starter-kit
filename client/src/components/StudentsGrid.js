import React from "react";
import students from "../db/students.json";
import studentsGrid from "./studentsGrid.css";

const StudentsGrid = () => {
	return (
		<div className="students-cards-container">
			{students.map((student, index) => (
				<div key={index} className="student-card">
					<p>{student.name}</p>
					<p>{student.email}</p>
					<p>{student.city}</p>
				</div>
			))}
		</div>
	);
};

export default StudentsGrid;