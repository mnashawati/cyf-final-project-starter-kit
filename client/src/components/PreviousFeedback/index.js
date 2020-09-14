import React, { useState, useEffect } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";


const PreviousFeedback = ({ student, allFeedback,
	// updateFeedback
}) => {

	const [selectedModule, setSelectedModule] = useState ("All-modules");
	const [selectedMentor, setSelectedMentor] = useState ("All-mentors");

	function getMentors(array, field) {
		const getArray = [];
		for (let i=0; i < array.length ; ++i) {
			const found = getArray.some((el) => el.name === array[i][field]);
			if (!found) {
				getArray.push({ "name" :array[i][field] });
			}
		}
		return getArray;
	}

	// All mentors assigned to mentors
	const mentors = getMentors(allFeedback, "mentor");

	const filteredFeedback = [...allFeedback].filter((feedback) => {
		if (selectedModule === "All-modules") {
			return true;
		} else {
			return selectedModule === feedback.module;
		}
	}).filter((feedback) => {
		if (selectedMentor === "All-mentors") {
			return true;
		} else {
			return selectedMentor === feedback.mentor;
		}
	});

	return filteredFeedback ? (
		<>
			<h3 className="previous-feedback-title">Previous Feedback</h3>
			<h5>Filter by Module :</h5>
			<select className="select-module"
				name="filter-by-module"
				value={module.name}
				onChange={(e) => setSelectedModule(e.target.value)}>
				<option>All-modules</option>
				{modules.map((module,index) =>
					<option key={index} value={module.name}
					>
						{module.name}
					</option>
				)}
			</select>
			<select className="select-mentor"
				name="filter-by-mentor"
				value={mentors.name}
				onChange={(e) => setSelectedMentor(e.target.value)}>
				<option>All-mentors</option>
				{mentors.map((mentor,index) =>
					<option key={index} value={mentor.name}
					>
						{mentor.name}
					</option>
				)}
			</select>
			<br />
			<hr />
			<div className="previous-feedback-section">
				{filteredFeedback.length && filteredFeedback.map((feedback, index) => (
					<div className="previous-feedback-section"
						key={index}>
						<FeedbackList feedbackToShow={feedback} student={student}
						// updateFeedback={updateFeedback}
						/>
					</div>
				))}
			</div>
		</>
	) : null;
};

const FeedbackList = ({ feedbackToShow, student, allFeedback,
	// updateFeedback
}) => {
	const [editedFeedback, setEditFeedback] = useState({});
	const [notEditable, setEditable] = useState(true);

	useEffect(() => {
		setEditFeedback(feedbackToShow);
	}, [feedbackToShow, allFeedback]);

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
			.catch((error) => console.log(error));
		// updateFeedback();
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
							setEditable(false);
						} else {
							saveFeedback(editedFeedback.id);
							setEditable(true);
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

PreviousFeedback.propTypes = {
	student: PropTypes.object.isRequired,
	allFeedback: PropTypes.array.isRequired,
	updateFeedback: PropTypes.func.isRequired,
};

Button.propTypes = {
	content: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
};

FeedbackList.propTypes = {
	student: PropTypes.object.isRequired,
	feedback: PropTypes.object.isRequired,
	// updateFeedback: PropTypes.func.isRequired,
	// index: PropTypes.number.isRequired,
};

export default PreviousFeedback;
