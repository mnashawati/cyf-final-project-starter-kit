import React, {useState} from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Pagination = ({ totalItems, itemsPerPage, setCurrentPage }) => {
	const pageNumbers = [];
	const [currentNumber, setCurrentNumber] = useState(1)

	const numberOfPages = totalItems / itemsPerPage;
	for (let i = 1; i <= Math.ceil(numberOfPages) ;i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="pagination">
			<a>&laquo;</a>
			{pageNumbers.map((number) => (
				<div className="page-numbers">
				<li  key={number} className="page-item">
					<a onClick={(e) => {
						e.preventDefault(),
						setCurrentPage(number);
						setCurrentNumber(number);
					}}
					href='!#'
					className="page-link"
					style={{ fontWeight: currentNumber == number ? "bolder" : "normal", 
							 color: currentNumber == number ? "red" : "black" }}>
						{number}
					</a>
				</li>
				</div>
			))}
			 <a>&raquo;</a>
		</ul>

	);
};

Pagination.propTypes = {
	totalItems: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;