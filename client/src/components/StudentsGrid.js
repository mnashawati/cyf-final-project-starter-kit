import React from "react";
import students from "../db/students.json";
import StudentCard from "./StudentCard";
import "./studentsGrid.css";

const StudentsGrid = () => {
	return (
		<div className="students-cards-container">
			{students.map((student, index) => (
				<StudentCard student={student} key={index} />
			))}
		</div>
	);
};

export default StudentsGrid;