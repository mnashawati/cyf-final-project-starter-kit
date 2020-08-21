/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import "./feedbackForm.css";
import ModuleSelector from "./ModuleSelector";


const FeedbackForm = () => {
	const [feedback, setFeedback] = useState({
		message: "",
		name: "",
	});

	const postFeedback =() => {
		fetch("/api", {
			method: "POST",
			headers: { "Content-type": "application/json",
			},
			body:JSON.stringify(
				feedback,
			),
		})
			.then((res) => {
				res.json();
			})
			.catch((error) => console.log(error));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		e.target.reset();
		postFeedback();
	};

	return (
		<div className="feedback-section-container">

			<form
				action=""
				className="feedback-form"
				onSubmit={handleSubmit}
			>
				<ModuleSelector />
				<label
					className="feedback-label"
					htmlFor="feedback"
					id="feedback"
				>
                    Write feedback for the student.
				</label>
				<textarea
					className="feedback-message"
					name="message"
					onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
					placeholder="Your message here..."
				></textarea>
				<div>
					<input
						className="input-name"
						name="name"
						onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
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
