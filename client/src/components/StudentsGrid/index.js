import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../StudentCard/index.js";
import Pagination from "../Pagination/index.js";
import Navbar from "../Navbar/index.js";
import Footer from "../Footer/index";
import getFilteringData from "../../helperFunctions/getFilteringData";
import "./styles.css";

const StudentsGrid = ( ) => {

	const params = useParams();
	const [students, setStudents] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [studentsPerPage] = useState(6);

	useEffect(() => {
		fetch("/api/students")
			.then((res) => res.json())
			.then((data) => setStudents(data.filter((student) => student.city == params.regionName)
				.sort((a, b) => {
					let firstName = a.name.toLowerCase();
					let secondName = b.name.toLowerCase();
					return firstName > secondName ? 1 : firstName < secondName ? -1 : 0;
				})))
			.catch((err) => console.log(err));
	}, []);

	const indexOfLastStudent = currentPage * studentsPerPage; // 6
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage; // 6-6=0
	const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);// students.slice(0,6)

	return (
		<>
			<Navbar linkClassName={"back-to-all-regions"} linkPathName="/regions" linkContent={"Back to all regions"} />
			<div className="container students-grid-container">
				<div className="filter-by-class-container row">
					<h2>Filter by class number: </h2>
					<select className="select-class-number">
						<option>Select a class</option>
						{getFilteringData(students, "class")
							.map((el, index) => <option key={index}>Class: {el}</option>)}
					</select>
				</div>
				<div className="students-cards-container row">
					{currentStudents && currentStudents.map((student, index) => (
						<StudentCard student={student} key={index} />
					))}
				</div>
			</div>
			<Pagination itemsPerPage={studentsPerPage} totalItems={students.length} setCurrentPage={setCurrentPage} />
			<Footer />
		</>
	);
};

export default StudentsGrid;