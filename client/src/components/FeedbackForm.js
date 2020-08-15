/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import "./feedbackForm.css";

const FeedbackForm = ({ student }) => {
	console.log("student",student);
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [givenFeedback, setGivenFeedback] = useState([]);
	const [feedbackList, setFeedbackList] = useState([]);

	const handlerSubmit = (e) => {
		e.preventDefault();
		setGivenFeedback(feedbackMessage);
		setFeedbackList([feedbackMessage, ...feedbackList]);
		setFeedbackMessage("");
	};

	const handleChange = (e) => {
		setFeedbackMessage(e.target.value);
	};
	return (
		<div className="flex-container">
			<div className="given-feedback-section">
				{feedbackList.map((feedback, index) => (
					<div key={index}>{feedback}</div>
				))}
			</div>

			<form
				action=""
				className="feedback-form"
				onSubmit={handlerSubmit}
			>
				<label
					className="feedback-label"
					htmlFor="feedback"
					id="feedback"
				>
                    Write feedback for the student.
				</label>
				<textarea
					name="message"
					className="feedback-message"
					onChange={(e) => handleChange(e)}
				></textarea>
				<div className="send-button-div">
					<button>Send Feedback</button>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
