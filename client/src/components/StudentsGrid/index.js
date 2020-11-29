import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../StudentCard/index.js";
import Pagination from "../Pagination/index.js";
import { getStudentsData } from "../Redux/Actions/studentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import getFilteringData from "../../helperFunctions/getFilteringData";
import "./styles.css";

const StudentsGrid = ({ students, getStudentsData }) => {

	useEffect(() => {
		getStudentsData();
	}, []);

	const params = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentClass, setCurrentClass] = useState(6);
	const studentsPerPage = 6;

	const allStudents = students && students.length && students.filter((student) => student.city == params.regionName).sort((a, b) => {
		let firstName = a.name.toLowerCase();
		let secondName = b.name.toLowerCase();
		return firstName > secondName ? 1 : firstName < secondName ? -1 : 0;
	});

	const indexOfLastStudent = currentPage * studentsPerPage; //6
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage; //6-6=0
	const filteredStudents = allStudents && allStudents.filter((student) => student.class == currentClass);
	const currentStudents = allStudents && filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent); //students.slice(0,6)

	return (
		<>
			{
				<div className="students-grid-wrapper">
					{allStudents && (
						<div className="container students-grid-container">
							<div className="filter-by-class-container row">
								<h2>Filter by {params.regionName} classes: </h2>
								<select
									className="select-class-number"
									value={currentClass}
									onChange={(e) =>
										setCurrentClass(e.target.value)
									}
								>
									{getFilteringData(allStudents, "class")
										.sort()
										.map((el, index) => (
											<option key={index} value={el}>
												{el === "MoTO"
													? el
													: "Class: " + el}
											</option>
										))}
								</select>
							</div>
							<div className="students-cards-container row">
								{allStudents
                                    && currentStudents.map((student, index) => (<StudentCard student={student} key={index} />))}
							</div>
							<div>
								<Pagination
									itemsPerPage={studentsPerPage}
									totalItems={filteredStudents.length}
									setCurrentPage={setCurrentPage}
								/>
							</div>
						</div>
					)}
				</div>
			}
		</>
	);
};

const mapStateToProps = (state) => {
	const { students } = state.studentsData;
	console.log(students);
	return { students };
};

const mapDispatchToProps = {
	getStudentsData,
};

StudentsGrid.propTypes = {
	students: PropTypes.array,
	getStudentsData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsGrid);