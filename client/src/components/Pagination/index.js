import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Pagination = ({ totalItems, itemsPerPage, setCurrentPage }) => {
	const pageNumbers = [];

	const numberOfPages = totalItems / itemsPerPage;
	for (let i = 1; i <= Math.ceil(numberOfPages) ;i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="pagination">
			{pageNumbers.map((number) => (
				<li  key={number} className="page-item">
					<a onClick={(e) => {
						e.preventDefault(),
						setCurrentPage(number);
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
	totalItems: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
