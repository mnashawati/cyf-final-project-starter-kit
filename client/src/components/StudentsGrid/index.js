import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../StudentCard/index.js";
import Pagination from "../Pagination/index.js";
import "./styles.css";
import Navbar from "../Navbar/index.js";

const StudentsGrid = ( ) => {

	const params = useParams();
	const [students, setStudents] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [studentsPerPage] = useState(6);


	useEffect(() => {

		setTimeout(function () {
			fetch("/api/students")
				.then((res) => res.json())
				.then((data) => setStudents(data.filter((student) => student.city == params.regionName)))
				.catch((err) => console.log(err));
	}, []);

	const indexOfLastStudent = currentPage * studentsPerPage; // 6
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage; // 6-6=0
	const currentStudent = students.slice(indexOfFirstStudent, indexOfLastStudent);// students.slice(0,6)

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<Navbar />
			<div className="students-cards-container row">
				{currentStudent && currentStudent.map((student, index) => (
					<StudentCard student={student} key={index} />
				))}
			</div>
			<Pagination studentsPerPage={studentsPerPage} totalStudents={students.length} paginate={paginate} />
		</>
	);
};

export default StudentsGrid;