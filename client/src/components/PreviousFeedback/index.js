/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import FeedbackObject from "../FeedbackObject";
import Pagination from "../Pagination/index";

const PreviousFeedback = ({ student, allFeedback, updateFeedback }) => {
	const [selectedModule, setSelectedModule] = useState("All modules");
	const [selectedMentor, setSelectedMentor] = useState("All mentors");

	const [currentPage, setCurrentPage] = useState(1);
	const [feedbackPerPage] = useState(4);


	function getFilteringData(array, field) {
		const existingFieldNames = [];
		array.forEach(
			(fb) =>
				!existingFieldNames.includes(fb[field])
          && existingFieldNames.push(fb[field])
		);
		return existingFieldNames;
	}

	const filteredFeedback = [
    ...allFeedback.sort((a, b) => (b.time > a.time ? 1 : -1)),
  ]
    .filter((feedback) =>
      selectedModule === "All modules"
        ? true
        : selectedModule === feedback.module
    )
    .filter((feedback) =>
      selectedMentor === "All mentors"
        ? true
        : selectedMentor === feedback.mentor
    );

	const modules = getFilteringData(filteredFeedback, "module").sort();
	// All mentors assigned to mentors and sorted alphabetically
	const mentors = getFilteringData(filteredFeedback, "mentor").sort(function (a,b) {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	const indexOfLastFeedback = currentPage * feedbackPerPage; // 5
	const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage; // 5-5=0
	const currentFeedbacks = filteredFeedback.slice(
		indexOfFirstFeedback,
		indexOfLastFeedback
	); // filteredFeedback.slice(0,5)

	return currentFeedbacks ? (
		<>
			<h3 className="previous-feedback-title">Previous Feedback</h3>
			<div className="filters">
				<div className="filter-by-module">
					<h5>Filter by Module:</h5>
					<select
						className="select-module"
						name="filter-by-module"
						value={selectedModule}
						onChange={(e) => setSelectedModule(e.target.value)}
					>
						<option>All modules</option>
						{modules.map((module, index) => (
							<option key={index} value={module}>
								{module}
							</option>
						))}
					</select>
				</div>
				<div className="filter-by-mentor">
					<h5>Filter by Mentor:</h5>
					<select
						className="select-mentor"
						name="filter-by-mentor"
						value={selectedMentor}
						onChange={(e) => setSelectedMentor(e.target.value)}
					>
						<option>All mentors</option>
						{mentors.map((mentor, index) => (
							<option key={index} value={mentor}>
								{mentor}
							</option>
						))}
					</select>
				</div>
			</div>
			<br />
			<hr />
			<div className="previous-feedback-section">
				{currentFeedbacks.map((feedback, index) => (
					<div className="previous-feedback-section" key={index}>
						<FeedbackObject
							feedbackToShow={feedback}
							student={student}
							updateFeedback={updateFeedback}
						/>
					</div>
				))}
			</div>
			<Pagination itemsPerPage={feedbackPerPage} totalItems={filteredFeedback.length} setCurrentPage={setCurrentPage} />
		</>
	) : (
		<p className="no-feedback-found-warning"> No feedback found! </p>
	);
};

PreviousFeedback.propTypes = {
	student: PropTypes.object.isRequired,
	allFeedback: PropTypes.array.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

export default PreviousFeedback;