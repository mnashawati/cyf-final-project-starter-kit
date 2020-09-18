import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../StudentCard/index.js";
import Pagination from "../Pagination/index.js";
import "./styles.css";
import Navbar from "../Navbar/index.js";
import Footer from "../Footer/index";

const StudentsGrid = ( ) => {

	const params = useParams();
	const [students, setStudents] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [studentsPerPage] = useState(6);


	useEffect(() => {
		fetch("/api/students")
			.then((res) => res.json())
			.then((data) => setStudents(data.filter((student) => student.city == params.regionName)))
			.catch((err) => console.log(err));
	}, []);

	const indexOfLastStudent = currentPage * studentsPerPage; // 6
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage; // 6-6=0
	const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);// students.slice(0,6)

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="students-cards-container row">
					{currentStudents && currentStudents.map((student, index) => (
						<StudentCard student={student} key={index} />
					))}
				</div>
			</div>
			<Pagination studentsPerPage={studentsPerPage} totalStudents={students.length} setCurrentPage={setCurrentPage} />
			<Footer />
		</>
	);
};

export default StudentsGrid;