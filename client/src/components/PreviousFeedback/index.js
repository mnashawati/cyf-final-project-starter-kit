import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";
import FeedbackList from "../FeedbackList";


const PreviousFeedback = ({ student, allFeedback, updateFeedback }) => {

	const [selectedModule, setSelectedModule] = useState ("All modules");
	const [selectedMentor, setSelectedMentor] = useState ("All mentors");

	function getMentors(array, field) {
		const existingMentorNames = [];

		array.forEach((fb) => !existingMentorNames.includes(fb[field]) ? existingMentorNames.push({ "name" : fb[field] }) : null);

		return existingMentorNames;
	}

	// All mentors assigned to mentors and sorted alphabetically
	const mentors = getMentors(allFeedback, "mentor").sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

	const filteredFeedback = [...allFeedback.reverse()].filter((feedback) => {
		if (selectedModule === "All modules") {
			return true;
		} else {
			return selectedModule === feedback.module;
		}
	}).filter((feedback) => {
		if (selectedMentor === "All mentors") {
			return true;
		} else {
			return selectedMentor === feedback.mentor;
		}
	});

	return filteredFeedback ? (
		<>
			<h3 className="previous-feedback-title">Previous Feedback</h3>
			<div className="filters">
				<div className="filter-by-module">
					<h5>Filter by Module:</h5>
					<select className="select-module"
						name="filter-by-module"
						value={module.name}
						onChange={(e) => setSelectedModule(e.target.value)}>
						<option>All modules</option>
						{modules.map((module,index) =>
							<option key={index} value={module.name}
							>
								{module.name}
							</option>
						)}
					</select>
				</div>
				<div className="filter-by-mentor">
					<h5>Filter by Mentor:</h5>
					<select className="select-mentor"
						name="filter-by-mentor"
						value={mentors.name}
						onChange={(e) => setSelectedMentor(e.target.value)}>
						<option>All mentors</option>
						{mentors.map((mentor,index) =>
							<option key={index} value={mentor.name}
							>
								{mentor.name}
							</option>
						)}
					</select>
				</div>
			</div>
			<br />
			<hr />
			<div className="previous-feedback-section">
				{filteredFeedback.length == false
					? <p className="no-feedback-found-warning"> No feedback found! </p>
					: filteredFeedback.length && filteredFeedback.map((feedback, index) => (
						<div className="previous-feedback-section"
							key={index}>
							<FeedbackList feedbackToShow={feedback} student={student} updateFeedback={updateFeedback}
							/>
						</div>
					))}
			</div>
		</>
	) : null;
};

PreviousFeedback.propTypes = {
	student: PropTypes.object.isRequired,
	allFeedback: PropTypes.array.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

export default PreviousFeedback;
