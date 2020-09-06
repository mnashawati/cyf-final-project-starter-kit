import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

const PreviousFeedback = ({ student, allFeedback, updateFeedback, feedbackToEdit }) => {

	//DELETE selected feedback PUT updates the DB
	const options = {
		method: "DELETE",
		headers: { "Content-type": "application/json" },
	};

	const deleteFeedback = (feedbackId) => {
		fetch(`/api/students/${student._id}/${feedbackId}`, options)
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
		updateFeedback();
		alert("Feedback Deleted Successfully");
	};

	const editFeedback = (feedback) => {
		feedbackToEdit(feedback);
	};

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

	return allFeedback ? (
		<>
			<p><b>Previous Feedback</b></p>
			<div className="previous-feedback-section">
				{allFeedback.map((item, index) => (
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
							<button className="previous-feedback-edit" onClick={() => editFeedback(item)}>EDIT</button>
							<button className="previous-feedback-delete" onClick={() => deleteFeedback(item.id)}>DELETE</button>
						</div>
					</div>
				))}
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
