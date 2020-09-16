import React, { useState } from "react";
import modules from "../../db/modules.json";
import "../FeedbackForm/styles.css";
import uuid from "react-uuid";
import PropTypes from "prop-types";

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
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(feedback),
	};

	const postFeedback = () => {
		fetch(`/api/students/${student._id}`, options)
			.then( (res) => res.json())
			.then((data) => {
				console.log(data);
				updateFeedback();
			})
			.catch((error) => console.log(error));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!feedback.module) {
			return alert("Please select a module");
		} else if (!feedback.title) {
			return alert("Please add a title");
		} else if (!feedback.text) {
			return alert("Please add your feedback in the box");
		}
		postFeedback();
		e.target.reset();
		setFeedback({
			id: "",
			module: "",
			title: "",
			text: "",
			mentor: "",
		});
	};

	// Re-usable handle change function, it takes the current feedback state object and changes only the property with the key of the event's name
	const handleChange = (e) => {
		setFeedback({ ...feedback, [e.target.name]: e.target.value });
	};

	return (
		<div className="feedback-form-container">
			<form
				action=""
				className="feedback-form"
				onSubmit={handleSubmit}
			>
				<div className="add-feedback-heading-container">
					<h3>Add Feedback</h3>
				</div>

				<div>
					<h3 className="feedback-input-heading">Module <b>*</b></h3>
					<select
						className="select-module"
						value={feedback.module}
						name="module"
						onChange={handleChange}
					>
						<option value="" defaultValue disabled hidden>Select a module</option>
						{modules.map((module,index) => <option value={module.name} key={index}>{module.name}</option>)}
					</select>
				</div>

				<div>
					<h3 className="feedback-input-heading">Feedback title <b>*</b></h3>
					<input className="feedback-title-input"
						type="text"
						name="title"
						value={feedback.title}
						onChange={handleChange}
						placeholder="">
					</input>
				</div>

				<div>
					<h3 className="feedback-input-heading">Add some feedback <b>*</b></h3>
					<textarea
						className="feedback-message-input"
						name="text"
						value={feedback.text}
						onChange={handleChange}
						placeholder=""
					></textarea>
				</div>

				<div>
					<h3 className="feedback-input-heading">Your name:</h3>
					<div className="feedback-form-bottom-section">
						<input
							className="mentor-name-input"
							type="text"
							name="mentor"
							value={feedback.mentor}
							onChange={handleChange}
							placeholder=""
						/>
						<input className="post-feedback-button-div"
							type="submit" value="POST FEEDBACK" />
					</div>
				</div>
			</form>
		</div>
	);
};

FeedbackForm.propTypes = {
	student: PropTypes.object.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

export default FeedbackForm;
