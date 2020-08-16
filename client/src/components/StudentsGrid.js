import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import "./studentsGrid.css";


const StudentsGrid = () => {

	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setStudents(data);
			})
			.catch((err) => console.log(err) );
	}
	, []);

	return (
		<div className="students-cards-container">
			{students.map((student, index) => (
				<StudentCard student={student} key={index} />
			))}
		</div>
	);
};

export default StudentsGrid;