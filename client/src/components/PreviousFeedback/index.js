import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import FeedbackList from "../FeedbackList";

const PreviousFeedback = ({ student, allFeedback, updateFeedback }) => {

	const [selectedModule, setSelectedModule] = useState ("All modules");
	const [selectedMentor, setSelectedMentor] = useState ("All mentors");

	function getFilteringData(array, field) {
		const existingFieldNames = [];
		array.forEach((fb) => !existingFieldNames.includes(fb[field]) && existingFieldNames.push(fb[field]));
		return existingFieldNames;
	}

	const modules = getFilteringData(allFeedback, "module");
	// All mentors assigned to mentors and sorted alphabetically
	const mentors = getFilteringData(allFeedback, "mentor").sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

	const filteredFeedback = [...allFeedback.reverse()]
		.filter((feedback) => selectedModule === "All modules" ? true : selectedModule === feedback.module)
		.filter((feedback) => selectedMentor === "All mentors" ? true : selectedMentor === feedback.mentor);

	return filteredFeedback ? (
		<>
			<h3 className="previous-feedback-title">Previous Feedback</h3>
			<div className="filters">
				<div className="filter-by-module">
					<h5>Filter by Module:</h5>
					<select className="select-module"
						name="filter-by-module"
						value={selectedModule}
						onChange={(e) => setSelectedModule(e.target.value)}>
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
					<select className="select-mentor"
						name="filter-by-mentor"
						value={selectedMentor}
						onChange={(e) => setSelectedMentor(e.target.value)}>
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
				{filteredFeedback.map((feedback, index) => (
					<div className="previous-feedback-section" key={index}>
						<FeedbackList feedbackToShow={feedback} student={student} updateFeedback={updateFeedback} />
					</div>
				))}
			</div>
		</>
	) : <p className="no-feedback-found-warning"> No feedback found! </p>
	;
};

PreviousFeedback.propTypes = {
	student: PropTypes.object.isRequired,
	allFeedback: PropTypes.array.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

export default PreviousFeedback;
