import React, { useContext } from "react";
import StudentCard from "./StudentCard";
import "./studentsGrid.css";
import { StudentsContext } from "../contexts/StudentsContext";

const StudentsGrid = () => {

	const { students } = useContext(StudentsContext);

	return students ? (
		<div className="students-cards-container">
			{students.map((student, index) => (
				<StudentCard student={student} key={index} />
			))}
		</div>

	): null;

};

export default StudentsGrid;