import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../StudentCard/index.js";
import "./styles.css";
import Navbar from "../Navbar/index.js";

const StudentsGrid = ( ) => {

	const params = useParams();
	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetch("/api/students")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);setStudents(data.filter((student) => student.city == params.regionName));
			})
			.catch((err) => console.log(err));
}, []);

	return  (
		<>
			<Navbar />
			<div className="students-cards-container row">
				{ students && students.map((student, index) => (
					<StudentCard student={student} key={index} />
				))}
			</div>
		</>
	);
};

export default StudentsGrid;