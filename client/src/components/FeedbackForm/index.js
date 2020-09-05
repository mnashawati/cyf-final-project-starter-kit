import React, { useState } from "react";
import modules from "../../db/modules.json";
import "../FeedbackForm/styles.css";
import uuid from "react-uuid";

const FeedbackForm = ({ student, updateFeedback }) => {
	const [feedback, setFeedback] = useState({
		id: "",
		module: "",
		title: "",
		text: "",
		mentor: "",
	});

	feedback.id = uuid();
	feedback.time = Date.now();

	const options = {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(feedback),
	};

	const postFeedback =() => {
		fetch(`/api/students/${student._id}`, options)
			.then( (res) => res.json())
			.catch((error) => console.log(error));
	};

	const handleSubmit = (e) => {
		if (!feedback.module) {
			return alert("Please select a module");
		} else if (!feedback.title) {
			return alert("Please add a title");
		} else if (!feedback.text) {
			return alert("Please add your feedback in the box");
		}
		e.preventDefault();
		postFeedback();
		updateFeedback();
		e.target.reset();
		setFeedback({
			id: "",
			module: "",
			title: "",
			text: "",
			mentor: "",
		});
	};

	// re-usable handle change function, it takes the current feedback state object and changes only the property with the key of the event's name
	const handleChange = (e) => {
		setFeedback({ ...feedback, [e.target.name]: e.target.value });
	};

	return (
		<div className="feedback-section-container">

			<form
				action=""
				className="feedback-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label
						className="feedback-label"
						htmlFor="feedback"
						id="feedback"
					>
                    Write feedback for the student.
					</label>
				</div>

				<div>
					<select
						value={feedback.module}
						name="module"
						onChange={handleChange}
					>
						<option value="" defaultValue disabled hidden>Select a module</option>
						{modules.map((module,index) => <option value={module.name} key={index}>{module.name}</option>)}
					</select> *
				</div>

				<div>
					<input className="input feedback-title"
						type="text"
						name="title"
						value={feedback.title}
						onChange={handleChange}
						placeholder="Feedback title...">
					</input> *
				</div>
				<div>
					<textarea
						className="feedback-message"
						name="text"
						value={feedback.text}
						onChange={handleChange}
						placeholder="Your message here..."
					></textarea> *
				</div>
				<div>
					<input
						className="input-name"
						type="text"
						name="mentor"
						value={feedback.mentor}
						onChange={handleChange}
						placeholder="Your name here..."
					/>
				</div>
				<div className="send-feedback-button-div">
					<input type="submit" value="Post feedback" />
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
