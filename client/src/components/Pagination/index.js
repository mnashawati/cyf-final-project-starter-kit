import React, { useState } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Pagination = ({ totalItems, itemsPerPage, setCurrentPage }) => {
	const pageNumbers = [];
	const [currentNumber, setCurrentNumber] = useState(1);

	const numberOfPages = totalItems / itemsPerPage;
	for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="pagination">
			{pageNumbers.map((number, index) => (
				<div className="page-numbers" key={index}>
					<li key={number} className="page-item">
						<a
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage(number);
								setCurrentNumber(number);
							}}
							href="!#"
							className="page-link"
							style={{
								fontWeight: currentNumber == number ? "900" : "100",
								color: currentNumber == number ? "black" : "gray",
								backgroundColor: currentNumber == number ? "#f6f6f6" : "white",
							}}
						>
							{number}
						</a>
					</li>
				</div>
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
