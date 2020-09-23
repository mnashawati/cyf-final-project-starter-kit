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
	const [currentClass, setCurrentClass] = useState("6");
	const [noStudents, setNoStudents] = useState(false);

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

	const indexOfLastStudent = currentPage * studentsPerPage; //6
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage; //6-6=0
	const filteredStudents = students.filter((student) => student.class == currentClass);
	const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent); //students.slice(0,6)

	return (
		<>
			<Navbar linkClassName={"back-to-all-regions"} linkPathName={"/regions"} linkContent={"<Back to regions"} />
			<div className="students-grid-wrapper">
				{students.length > 0
					? <div className="container students-grid-container">
						<div className="filter-by-class-container row">
							<h2>Filter by {params.regionName} classes: </h2>
							<select className="select-class-number"
								value={currentClass}
								onChange={(e) => setCurrentClass(e.target.value)}>
								{getFilteringData(students, "class")
									.sort()
									.map((el, index) => (
										<option key={index} value={el}>
											{el === "MoTO" ? el : "Class: " + el}
										</option>
									))}
							</select>
						</div>
						<div className="students-cards-container row">
							{currentStudents && currentStudents.map((student, index) => (
								<StudentCard student={student} key={index} />
							))}
						</div>
						<Pagination itemsPerPage={studentsPerPage} totalItems={filteredStudents.length} setCurrentPage={setCurrentPage} />
					</div>
					: <h1>No students found</h1>}
			</div>
			<Footer />
		</>
	);
};

export default StudentsGrid;