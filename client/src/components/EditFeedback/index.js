import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";

const EditFeedback = ({ feedbackToBeEdited, noShowPage, updateFeedback, student }) => {
	console.log(feedbackToBeEdited);

	const [editedFeedback, setEditedFeedback] = useState(
		feedbackToBeEdited
	);

	//POST updated feedback to the API-DB
	const options = {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(editedFeedback),
	};

	//When clicked SAVE; UPDATE the data and No Show Edit feedback
	const getUpdatedData = () => {
		fetch(`/api/students/${student._id}/feedback/${feedbackToBeEdited.id}`, options)
			.then( (res) => res.json())
			.then((data) => {
				console.log(data);updateFeedback();
			})
			.catch((error) => console.log(error));
		alert("Feedback Updated Successfully");
		noShowPage();
	};

	//When clicked SAVE, CHECK if field is empty
	const saveFeedback =() => {
		if (!editedFeedback.module) {
			return alert("Please add a module");
		} else if (!editedFeedback.title) {
			return alert("Please add a title");
		} else if (!editedFeedback.text) {
			return alert("Please add your feedback");
		} else if (!editedFeedback.mentor) {
			return alert("Please add mentor name");
		}
		getUpdatedData();
	};
	// Populate new object with edited data
	const handleChange = (e) => {
		setEditedFeedback({ ...editedFeedback, [e.target.name] : e.target.value });
	};

	const cancelEditFeedback = () => {
		noShowPage();
	};

	return feedbackToBeEdited ? (
		<>
			<div className="edit-previous-feedback-section">
				<form
					action="" className="edit-feedback-form" >
					<div><p className="edit-feedback-label" style={{ textAlign:"center", fontSize:"16px" }}>Update Your Feedback</p>
						<hr style={{ width:"40%", margin:"auto", marginBottom:"8px" }}></hr>
					</div>
					<div>
						<h3 className="feedback-input-heading">Update Module <b>*</b></h3>
						<select
							value={editedFeedback.module}
							name="module">
							<option value="" defaultValue disabled hidden>{feedbackToBeEdited.module}</option>
							{modules.map((module,index) => <option value={module.name} key={index}>{module.name}</option>)}
						</select>
					</div>

					<div>
						<h3 className="feedback-input-heading">Feedback title <b>*</b></h3>
						<input
							className="feedback-title"
							type="text"
							name="title"
							value={editedFeedback.title}
							onChange={handleChange}
							placeholder={editedFeedback.title.length ? null : "some text..." }
						/>
					</div>
					<div className="feedback-text-container">
						<h3 className="feedback-input-heading">Update your feedback <b>*</b></h3>
						<input
							className="feedback-message"
							name="text"
							value={editedFeedback.text}
							onChange={handleChange}
							placeholder={editedFeedback.title.length ? null : "some text..." }
						/>
					</div>
					<div>
						<h3 className="feedback-input-heading">Update your name</h3>
						<input
							className="feedback-mentor"
							type="text"
							name="mentor"
							value={editedFeedback.mentor}
							onChange={handleChange}
							placeholder={editedFeedback.title.length ? null : "some text..." }
						/>
					</div>
				</form>
				<div className="buttons">
					<button className="save-edited-feedback" onClick={()=>saveFeedback()}>SAVE</button>
					<button className="cancel-edit-feedback" onClick={()=>cancelEditFeedback()}>CANCEL</button>
				</div>
			</div>
		</>
	) : null;
};

EditFeedback.propTypes = {
	feedbackToBeEdited: PropTypes.object.isRequired,
	noShowPage: PropTypes.func.isRequired,
	updateFeedback: PropTypes.func.isRequired,
	student: PropTypes.object.isRequired,
};

export default EditFeedback;


