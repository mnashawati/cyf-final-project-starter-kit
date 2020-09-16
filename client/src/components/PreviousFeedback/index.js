import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";
import FeedbackList from "../FeedbackList";


const PreviousFeedback = ({ student, allFeedback, updateFeedback }) => {

	const [selectedModule, setSelectedModule] = useState ("All-modules");
	const [selectedMentor, setSelectedMentor] = useState ("All-mentors");

	function getMentors(array, field) {
		const getArray = [];
		for (let i=0; i < array.length ; ++i) {
			const found = getArray.some((el) => el.name === array[i][field]);
			if (!found) {
				getArray.push({ "name" :array[i][field] });
			}
		}
		return getArray;
	}

	// All mentors assigned to mentors
	const mentors = getMentors(allFeedback, "mentor");

	allFeedback = allFeedback.reverse();

	const filteredFeedback = [...allFeedback].filter((feedback) => {
		if (selectedModule === "All-modules") {
			return true;
		} else {
			return selectedModule === feedback.module;
		}
	}).filter((feedback) => {
		if (selectedMentor === "All-mentors") {
			return true;
		} else {
			return selectedMentor === feedback.mentor;
		}
	});

	return filteredFeedback ? (
		<>
			<h3 className="previous-feedback-title">Previous Feedback</h3>
			<h5>Filter by Module and/or mentor:</h5>
			<select className="select-module"
				name="filter-by-module"
				value={module.name}
				onChange={(e) => setSelectedModule(e.target.value)}>
				<option>All-modules</option>
				{modules.map((module,index) =>
					<option key={index} value={module.name}
					>
						{module.name}
					</option>
				)}
			</select>
			<select className="select-mentor"
				name="filter-by-mentor"
				value={selectedMentor}
				onChange={(e) => setSelectedMentor(e.target.value)}>
				<option>All-mentors</option>
				{mentors.map((mentor,index) =>
					<option key={index} value={mentor.name}
					>
						{mentor.name}
					</option>
				)}
			</select>
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
