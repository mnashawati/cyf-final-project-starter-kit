import React, { useContext } from "react";
import StudentCard from "./StudentCard";
import "./studentsGrid.css";
import { StudentsContext } from "../contexts/StudentsContext";

const StudentsGrid = () => {

	const { students } = useContext(StudentsContext);
	console.log("students---->", students);
	return students ? (
		<div className="students-cards-container">
			{students.map((student, index) => (
				<StudentCard student={student} key={index} />
			))}
		</div>

	): null;

};

export default StudentsGrid;