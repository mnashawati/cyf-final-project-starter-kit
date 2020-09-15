import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Pagination = ({ totalStudents, studentsPerPage, paginate }) => {
	const pageNumbers = [];

	const numberOfPages = totalStudents / studentsPerPage;
	for (let i = 1; i <= Math.ceil(numberOfPages) ;i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="pagination">
			{pageNumbers.map((number) => (
				<li  key={number} className="page-item">
					<a onClick={(e) => {
						e.preventDefault(),
						paginate(number);
					}}
					href='!#'
					className="page-link">
						{number}
					</a>
				</li>
			))}
		</ul>

	);
};

Pagination.propTypes = {
	totalStudents: PropTypes.number.isRequired,
	studentsPerPage: PropTypes.number.isRequired,
	paginate: PropTypes.func.isRequired,
};

export default Pagination;
