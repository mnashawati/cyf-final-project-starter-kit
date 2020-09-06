import React, { useState, useEffect } from "react";
import StudentCard from "../StudentCard/index.js";
import "./styles.css";

const StudentsGrid = ( ) => {

	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetch("/api/students")
			.then((res) => res.json())
			.then((data) => {
				setStudents(data);
			})
			.catch((err) => console.log(err));
	}
	, []);

	return  (
		<div className="students-cards-container">
			{ students && students.map((student, index) => (
				<StudentCard student={student} key={index} />
			))}
		</div>

	);

};

export default StudentsGrid;