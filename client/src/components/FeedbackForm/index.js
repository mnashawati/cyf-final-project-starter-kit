/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import "./css/feedbackForm.css";
import ModuleSelector from "./ModuleSelector";


const FeedbackForm = () => {
	const [feedback, setFeedback] = useState({
		module: "",
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

	// re-usable handle change function, it takes the current feedback state object and changes only the property with the key of the event's name
	const handleChange = (e) => {
		setFeedback(...feedback, { [e.target.name]: e.target.value });
	};

	return (
		<div className="feedback-section-container">

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
				<ModuleSelector name="module" onChange={handleChange} />
				<textarea
					className="feedback-message"
					name="message"
					onChange={handleChange}
					placeholder="Your message here..."
				></textarea>
				<div>
					<input
						className="input-name"
						name="name"
						onChange={handleChange}
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
