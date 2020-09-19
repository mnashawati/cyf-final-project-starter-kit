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
    fetch(`/api/students/${student._id}/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(currentFeedback),
    })
      .then((res) => res.json())
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
    fetch(`/api/students/${student._id}/${feedbackId}`, {
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

  return ( currentFeedback
	&& <div className="previous-feedback-list">
		<div className="previous-feedback-module">
			<p className="feedback-input-head">Module:</p>
			{!isEditing
				? <p>{currentFeedback.module}</p>
				: <select
					name={"module"}
					value={currentFeedback.module}
					onChange={handleEdit}>
					{modules.map((module, index) =>
						<option key={index} value={module.name}>{module.name}</option>
					)}
				</select>}
		</div>
		<div className="previous-feedback-title">
			<p className="feedback-input-head">Title:</p>
			<input
				className=""
				name={"title"}
				value={currentFeedback.title}
				onChange={handleEdit}
				disabled={!isEditing}
			/>
		</div>
		<div className="previous-feedback-text">
			<p className="feedback-input-head">Feedback:</p>
			<textarea
				className="previous-feedback-text-input"
				name={"text"}
				value={currentFeedback.text}
				onChange={handleEdit}
				disabled={!isEditing}
			/>
		</div>
		<div className="previous-feedback-mentor">
			<p className="feedback-input-head">Given by:</p>
			<input
				className="previous-feedback-mentor-input"
				name={"mentor"}
				value={currentFeedback.mentor}
				onChange={handleEdit}
				disabled
			/>
		</div>
		<div className="previous-feedback-time">
			<input
				className="previous-feedback-time-input"
				name={"time"}
				value={timeDifference(Date.now(), currentFeedback.time)}
				onChange={handleEdit}
				disabled
			/>
		</div>
		<div className="edit-delete-buttons">
			<Button
				content={isEditing ? "Save" : "Edit"}
				handleClick={() => {
					setIsEditing(!isEditing);
					isEditing && saveFeedback(currentFeedback.id);
				}}
			/>
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
);

FeedbackObject.propTypes = {
  student: PropTypes.object.isRequired,
  feedbackToShow: PropTypes.object.isRequired,
  updateFeedback: PropTypes.func.isRequired,
};

export default FeedbackObject;
