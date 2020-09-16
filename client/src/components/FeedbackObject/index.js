/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import timeDifference from "../../helperFunctions/timeDifference";

const FeedbackObject = ({ feedbackToShow, student, updateFeedback }) => {

	const [isEditing, setIsEditing] = useState(false);

	//POST updated feedback to DB
	//When clicked SAVE; UPDATE the data
	const updateData = (id) => {
		fetch(`/api/students/${student._id}/feedback/${id}`,
			{
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(feedbackToShow),
			})
			.then( (res) => res.json())
			.catch((error) => console.log(error));
	};

	//When clicked SAVE, CHECK if field is empty
	const saveFeedback = (id) => {
		if (!feedbackToShow.title) {
			return alert("Please add a title");
		} else if (!feedbackToShow.text) {
			return alert("Please add your feedback");
		} else if (!feedbackToShow.mentor) {
			return alert("Please add your name");
		}
		updateData(id);
	};

	//DELETE selected feedback and update data
	const handleDelete = (feedbackId) => {
		fetch(`/api/students/${student._id}/${feedbackId}`,
			{
				method: "DELETE",
				headers: { "Content-type": "application/json" },
			})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	};

	return (
		<div className="previous-feedback-list">
			{Object.keys(feedbackToShow).length && Object.keys(feedbackToShow)
				.map((property, index) => {
					if (property === "module") {
						return (
							<div className="previous-feedback-module" key={index}>
								<p className="feedback-input-head">Feedback module:</p>
								{!isEditing
									? <p>{feedbackToShow[property]}</p>
									: <select
										name={property}
										value={feedbackToShow[property]}>
										{modules.map((module, index) =>
											<option key={index} value={module.name}>{module.name}</option>
										)}
									</select>}
							</div>
						);
					}
					if (property === "title") {
						return (
							<div className="previous-feedback-title" key={index}>
								<p className="feedback-input-head">Feedback title:</p>
								<input
									className="feedback-title-input"
									name={property}
									value={feedbackToShow[property]}
									disabled={!isEditing}
								/>
							</div>
						);
					}
					if (property === "text") {
						return (
							<div className="previous-feedback-text" key={index}>
								<p className="feedback-input-head">Feedback:</p>
								<textarea
									className="previous-feedback-text-input"
									name={property}
									value={feedbackToShow[property]}
									disabled={!isEditing}
								/>
							</div>
						);
					}
					if (property === "time") {
						return (
							<div className="previous-feedback-time" key={index}>
								<input
									className="previous-feedback-time-input"
									name={property}
									value={timeDifference(Date.now(), feedbackToShow[property])}
									disabled
								/>
							</div>
						);
					}
					if (property === "mentor") {
						return (
							<div className="previous-feedback-mentor" key={index}>
								<p className="feedback-input-head">Given by:</p>
								<input
									className="previous-feedback-mentor-input"
									name={property}
									value={feedbackToShow[property]}
									disabled
								/>
							</div>
						);
					}
				})}
			<div className="edit-delete-buttons">
				<Button
					content={isEditing ? "Save" : "Edit"}
					handleClick={() => {
						setIsEditing(!isEditing);
						isEditing && saveFeedback(feedbackToShow.id);
					}}
				/>
				<div>
					<Button
						content="Delete"
						handleClick={() => {
							alert("DELETE");
							handleDelete(feedbackToShow.id);
							updateFeedback();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

FeedbackObject.propTypes = {
	student: PropTypes.object.isRequired,
	feedbackToShow: PropTypes.object.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

export default FeedbackObject;