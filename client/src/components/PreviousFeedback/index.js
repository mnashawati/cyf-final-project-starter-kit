import React, { useState } from "react";
import "./styles.css";
import FeedbackButtons from "../FeedbackButtons";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";

const PreviousFeedback = ({ student, allFeedback, updateFeedback, feedbackToEdit }) => {

	const [selectedModule, setSelectedModule] = useState ("All-modules");
	const [selectedMentor, setSelectedMentor] = useState ("All-mentors");

	// Collect mentor data from allFeedback array and assing to array of object (llmentors)
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

	//DELETE selected feedback PUT updates the DB
	const options = {
		method: "DELETE",
		headers: { "Content-type": "application/json" },
	};

	const handleDelete = (feedbackId) => {
		fetch(`/api/students/${student._id}/${feedbackId}`, options)
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
		updateFeedback();
		alert("Feedback Deleted Successfully");
	};

	const handleEdit = (feedback) => {
		feedbackToEdit(feedback);
	};

	const filteredFeedback = [...allFeedback].filter((item) => {
		if (selectedModule === "All-modules" && selectedMentor === "All-mentors"){
			return true;
		}  else if ((selectedModule !== "All-modules" && selectedMentor === "All-mentors") ) {
			return  item.module.includes(selectedModule);
		} else if (selectedModule === "All-modules" && selectedMentor !== "All-mentors"){
			return  item.mentor.includes(selectedMentor);
		} else {
			return  item.module.includes(selectedModule) && item.mentor.includes(selectedMentor);
		}
	});

	const timeDifference = (current, previous) => {
		const ms_Min = 60 * 1000; // milliseconds in a Minute
		const ms_Hour = ms_Min * 60; // milliseconds in an Hour
		const ms_Day = ms_Hour * 24; // milliseconds in a Day
		const ms_Week = ms_Day * 7; // milliseconds in a Week

		const diff = current - previous; //difference between dates.

		return diff < ms_Min
			? `Posted ${Math.round(diff / 1000)} seconds ago`
			: diff < ms_Hour
				? Math.round(diff / ms_Min) == 1
					? `Posted ${Math.round(diff / ms_Min)} minute ago`
					: `Posted ${Math.round(diff / ms_Min)} minutes ago`
				: diff < ms_Day
					? Math.round(diff / ms_Hour) == 1
						? `Posted ${Math.round(diff / ms_Hour)} hour ago`
						: `Posted ${Math.round(diff / ms_Hour)} hours ago`
					: diff < ms_Week
						? Math.round(diff / ms_Day) == 1
							? `Posted ${Math.round(diff / ms_Day)} day ago`
							: `Posted ${Math.round(diff / ms_Day)} days ago`
						: Math.round(diff / ms_Week) == 1
							? `Posted ${Math.round(diff / ms_Week)} week ago`
							: `Posted ${Math.round(diff / ms_Week)} weeks ago`;
	};

	return filteredFeedback ? (
		<>
			<h3 className="previous-feedback-title">Previous Feedback</h3>
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
				value={mentors.name}
				onChange={(e) => setSelectedMentor(e.target.value)}>
				<option>All-mentors</option>
				{mentors.map((mentor,index) =>
					<option key={index} value={mentor.name}
					>
						{mentor.name}
					</option>
				)}
			</select>
			<div className="previous-feedback-section">
				{filteredFeedback.map((item, index) => (
					<div key={index} className="previous-feedback-container">
						<div className="previous-feedback-list">
							<p className="feedback-module"><b>MODULE:</b> {item.module}</p>
							<p className="feedback-title">{item.title}</p>
							<p className="feedback-text">{item.text}</p>
							<div className="date-mentor">
								<p className="feedback-date">{timeDifference(Date.now(), item.time)}</p>
								<p className="feedback-mentor">Given by: {item.mentor}</p>
							</div>
						</div>
						<div className="buttons">
							<FeedbackButtons handleEdit={handleEdit} handleDelete={handleDelete} item={item} />
						</div>
					</div>
				))}
				{filteredFeedback.length === 0 && <span>No feedback found to display!</span>}
			</div>
		</>
	) : null;
};

PreviousFeedback.propTypes = {
	student: PropTypes.object.isRequired,
	allFeedback: PropTypes.object.isRequired,
	updateFeedback: PropTypes.func.isRequired,
	feedbackToEdit: PropTypes.func.isRequired,
};

export default PreviousFeedback;
