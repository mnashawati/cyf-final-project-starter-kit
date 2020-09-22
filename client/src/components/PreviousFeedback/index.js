/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import FeedbackObject from "../FeedbackObject";
import PropTypes from "prop-types";
import "./styles.css";
import Pagination from "../Pagination/index";
import getFilteringData from "../../helperFunctions/getFilteringData";

const PreviousFeedback = ({ student, allFeedback, updateFeedback }) => {
	const [selectedModule, setSelectedModule] = useState("All modules");
	const [selectedMentor, setSelectedMentor] = useState("All mentors");

	const [currentPage, setCurrentPage] = useState(1);
	const [feedbackPerPage] = useState(4);

	const filteredFeedback = [
		...allFeedback.sort((a, b) => {
			return a.time > b.time ? -1 : b.time > a.time ? 1 : 0;
		}),
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

	function sortThings(a, b) {
		a = a.toLowerCase();
		b = b.toLowerCase();
		return a > b ? 1 : b > a ? -1 : 0;
	}

	const modules = getFilteringData(filteredFeedback, "module").sort();
	// All mentors assigned to mentors and sorted alphabetically
	const mentors = getFilteringData(filteredFeedback, "mentor").sort(sortThings);

	const indexOfLastFeedback = currentPage * feedbackPerPage; // 5
	const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage; // 5-5=0
	const currentFeedbacks = filteredFeedback.slice(
		indexOfFirstFeedback,
		indexOfLastFeedback
	); // filteredFeedback.slice(0,5)

	return currentFeedbacks.length ? (
		<div className="previous-feedback-section-container">
			<div className="previous-feedback-section">
				<div className="previous-feedback-title-and-counter">
					<h3 className="previous-feedback-title">Previous Feedback</h3>
					<div className="filtered-feedback-counter-div">
						<p className="filtered-feedback-counter">{`${filteredFeedback.length}/${allFeedback.length}`}</p>
						<p className="filtered-feedback-counter-text">feedbacks</p>
					</div>
				</div>
				<div>
					<div className="module-mentor-filters-container">
						<div className="filter-by-module-container">
							<h6>Filter by Module:</h6>
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
						<div className="filter-by-mentor-container">
							<h6>Filter by Mentor:</h6>
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
				</div>
				<br />
				<div className="feedback-pages-section">
					{currentFeedbacks.map((feedback, index) => (
						<div className="feedback-object-section" key={index}>
							<FeedbackObject
								feedbackToShow={feedback}
								student={student}
								updateFeedback={updateFeedback}
							/>
						</div>
					))}
				</div>
			</div>
			<Pagination
				itemsPerPage={feedbackPerPage}
				totalItems={filteredFeedback.length}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	) : (
		<div className="no-feedback-found-warning-container">
		  <p className="no-feedback-found-warning"> No feedback given! Please write a feedback... </p>
	 	 </div>
	);
};

PreviousFeedback.propTypes = {
	student: PropTypes.object.isRequired,
	allFeedback: PropTypes.array.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

export default PreviousFeedback;
