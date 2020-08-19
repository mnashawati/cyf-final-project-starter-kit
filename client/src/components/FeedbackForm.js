/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import "./feedbackForm.css";

const FeedbackForm = () => {
	const [feedbackMessage, setFeedbackMessage] = useState({
		feedback: "",
		name: "",
	});
	const [givenFeedback, setGivenFeedback] = useState([]);
	const [feedbackList, setFeedbackList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setGivenFeedback(feedbackMessage);
		setFeedbackList([feedbackMessage.feedback, ...feedbackList]);
		setFeedbackMessage("");
		fetch("/api", {
			method: "POST",
			mode: "cors",
			headers: { "Content-type": "application/json",
			},
			body:JSON.stringify(
				feedbackMessage,
			),
		})
			.then((res) => {
				res.json(); console.log(res);
			})
			.catch((error) => console.log(error));
	};

	const handleChange = (name) => (e) => {
		setFeedbackMessage({ ...feedbackMessage, [name]: e.target.value });
	};

	return (
		<div className="feedback-section-container">
			<div className="given-feedback-section">
				{feedbackList.map((feedback, index) => (
					<div key={index}>{feedback}</div>
				))}
			</div>

			<form
				action=""
				className="feedback-form"
				onSubmit={handleSubmit}
			>
				<label
					className="feedback-label"
					htmlFor="feedback"
					id="feedback"
				>
                    Write feedback for the student.
				</label>
				<textarea
					name="feedback"
					className="feedback-message"
					onChange={handleChange("feedback")}
				></textarea>
				<div>
					<input
						className="input-message"
						type="name"
						onChange={handleChange("name")}
						placeholder="Your name here..."
					/>
				</div>
				<div className="send-feedback-button-div">
					<button>Send Feedback</button>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
