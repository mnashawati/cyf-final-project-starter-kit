import React from "react";
import StudentCard from "../StudentCard/index.js";
import "./styles.css";

const StudentsGrid = ({ students } ) => {

	return  (
		<div className="students-cards-container">
			{students.map((student, index) => (
				<StudentCard student={student} key={index} />
			))}
		</div>

	);

};

export default StudentsGrid;