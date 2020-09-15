import React, { useState, useEffect } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";

const FeedbackList = ({ feedbackToShow, student, updateFeedback }) => {

	const [editedFeedback, setEditFeedback] = useState({});
	const [notEditable, setNotEditable] = useState(true);

	useEffect(() => {
		setEditFeedback(feedbackToShow);
	}, [feedbackToShow]);

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

	//POST updated feedback to DB
	//When clicked SAVE; UPDATE the data
	const updateData = (id) => {
		fetch(`/api/students/${student._id}/feedback/${id}`, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(editedFeedback) })
			.then( (res) => res.json())
			.then((data) => {
				console.log(data);
				// updateFeedback();
			})
			.catch((error) => console.log(error));
	};

	//When clicked SAVE, CHECK if field is empty
	const saveFeedback = (id) => {
		if (!editedFeedback.title) {
			return alert("Please add a title");
		} else if (!editedFeedback.text) {
			return alert("Please add your feedback");
		} else if (!editedFeedback.mentor) {
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
			// .then(()=> updateFeedback())
			.catch((error) => console.log(error));
		updateFeedback();
	};

	// Populate new object with edited data editable
	const handleEdit = (e) => {
		setEditFeedback({ ...editedFeedback, [e.target.name]: e.target.value });
	};

	return (
		<div
			className="previous-feedback-list">
			{Object.keys(editedFeedback).length
        && Object.keys(editedFeedback).map((property, index) => {

        	if (property === "module" && notEditable ) {
        		return (
        			<div className="previous-feedback-module" key={index}>
        				<p className="feedback-input-head">Feedback module: </p>
        				<p>{editedFeedback[property]}</p>
        			</div> );
        	}
        	if (property === "module" && !notEditable ) {
        		return (
        			<div className="previous-feedback-module" key={index}>
        				<p className="feedback-input-head">Feedback module: </p>
        				<select
        					name="module"
        					disabled={notEditable}
        					value={editedFeedback[property]}
        					onChange={handleEdit}>
        					{modules.map((module,index) => <option key={index} value={module.name}
        					> {module.name}</option>
        					)}
        				</select>
        			</div>
        		);
        	}
        	if (property === "title") {
        		return (
        			<div className="previous-feedback-title" key={index}>
        				<p className="feedback-input-head">Feedback title</p>
						 <input
						 className="feedback-title-input"
						 onChange={handleEdit}
						 name="title"
						 value={editedFeedback[property]}
						 disabled={notEditable}
						 />
        			</div> );
        	}
        	if (property === "text") {
        		return (
        			<div className="previous-feedback-text" key={index}>
        				<p className="feedback-input-head">Feedback</p>
					 	<textarea
        				className="previous-feedback-text-input"
        				onChange={handleEdit}
        				name="text"
        				value={editedFeedback[property]}
					 	disabled={notEditable}
        				/>
        			</div> );
        	}
        	if (property === "time") {
        		return (
        			<div className="previous-feedback-time" key={index}>
        				<input
        					className="previous-feedback-time-input"
        					onChange={handleEdit}
        					name="time"
        					value={timeDifference(Date.now(), editedFeedback[property])}
        					disabled
        				/>
        			</div>
        		);
        	}
        	if (property === "mentor") {
        		return (
        			<div className="previous-feedback-mentor" key={index}>
        				<p className="feedback-input-head">Given by: </p>
        				<input
        					className="previous-feedback-mentor-input"
        					onChange={handleEdit}
        					name={property}
        					value={editedFeedback[property]}
        					disabled
        				/>
        			</div>
        		);
        	}
        })}
			<div className="edit-delete-buttons">
				<Button
					className="edit-button"
					handleClick={() => {
						if (notEditable) {
							setNotEditable(false);
						} else {
							saveFeedback(editedFeedback.id);
							setNotEditable(true);
						}
					}}
					content={notEditable ? "EDIT" : "SAVE"}
				/>
				<div>
					<Button
						className="delete-button"
						handleClick={() => {
							alert("DELETE"); handleDelete(editedFeedback.id);
						}} content="DELETE" />
				</div>
			</div>
		</div>
	);
};

const Button = ({ content, handleClick }) => (
	<button className={ content==="DELETE" ? "delete-button" : "edit-button" }
		onClick={handleClick}>{content}</button>
);

FeedbackList.propTypes = {
	student: PropTypes.object.isRequired,
	feedbackToShow: PropTypes.object.isRequired,
	// allFeedback: PropTypes.object.isRequired,

	updateFeedback: PropTypes.func.isRequired,
	// index: PropTypes.number.isRequired,
};

Button.propTypes = {
	content: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default FeedbackList;