/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import timeDifference from "../../helperFunctions/timeDifference";

const FeedbackObject = ({ feedbackToShow, student, updateFeedback }) => {

	const [isEditing, setIsEditing] = useState(false);
	const [currentFeedback, setCurrentFeedback] = useState({});

	useEffect(() => {
		setCurrentFeedback(feedbackToShow);
	}, [feedbackToShow]);

	//POST updated feedback to DB
	//When clicked SAVE; UPDATE the data
	const updateData = (id) => {
		fetch(`/api/students/${student._id}/feedback/${id}`,
			{
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(currentFeedback),
			})
			.then( (res) => res.json())
			.catch((error) => console.log(error));
	};

	//When clicked SAVE, CHECK if field is empty
	const saveFeedback = (id) => {
		if (!currentFeedback.title) {
			return alert("Please add a title");
		} else if (!currentFeedback.text) {
			return alert("Please add your feedback");
		} else if (!currentFeedback.mentor) {
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

	// Populate new object with edited data editable
	const handleEdit = (e) => {
		setCurrentFeedback({ ...currentFeedback, [e.target.name]: e.target.value });
	};

	return (
		<div className="previous-feedback-list">
			{Object.keys(currentFeedback).length && Object.keys(currentFeedback)
				.map((property, index) => {
					if (property === "module" ) {
						return (
							<div className="feedback-title-module">
							<div className="previous-feedback-title" key={index}>
								<div>
									<h5 className="title-module-title">Title</h5>
									<textarea
										className="feedback-title-input"
										name="title"
										value={currentFeedback.title}
										onChange={handleEdit}
										disabled={!isEditing}
									/>
								</div>
							</div>
							<div className="previous-feedback-module" key={index}>
								<div>
									<h5 className="title-module-title">Module</h5>
									{!isEditing
										? <p className="modules-dropdown">{currentFeedback.module}</p>
										: <select
											name={property}
											value={currentFeedback[property]}
											onChange={handleEdit}>
											{modules.map((module, index) =>
												<option className="modules-dropdown" key={index} value={module.name}>{module.name}</option>
											)}
										</select>}
								</div>
							</div>
							</div>
						);
					}
					if (property === "text") {
						return (
							<div className="previous-feedback-text" key={index}>
								<textarea
									className="previous-feedback-text-input"
									name={property}
									value={currentFeedback.text}
									onChange={handleEdit}
									disabled={!isEditing}
									/>
							</div>
						);
					}
					if (property === "mentor") {
						return (
							<div className="feedback-mentor-time">
								<div className="previous-feedback-time" key={index}>
									<input
										className="previous-feedback-time-input"
										name="time"
										value={timeDifference(Date.now(), currentFeedback.time)}
										onChange={handleEdit}
										disabled
									/>
								</div>
								<div className="previous-feedback-mentor" key={index}>
									<p className="feedback-input-mentor-name">Given by:</p>
									<input
										className="previous-feedback-mentor-input"
										name="mentor"
										value={currentFeedback.mentor}
										onChange={handleEdit}
										disabled
									/>
								</div>
							</div>
						);
					}
				})}
			<div className="edit-delete-buttons">
				<Button
					content={isEditing ? "Save" : "Edit"}
					handleClick={() => {
						setIsEditing(!isEditing);
						isEditing && saveFeedback(currentFeedback.id);
					}}
				/>
				<div>
					<Button
						content="Delete"
						handleClick={() => {
							alert("DELETE");
							handleDelete(currentFeedback.id);
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