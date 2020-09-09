import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";

const EditFeedback = ({ feedbackToBeEdited, noShowPage, updateFeedback, student }) => {
	console.log(feedbackToBeEdited);

	const [editedFeedback, setEditedFeedback] = useState({
		id:feedbackToBeEdited.id,
		module:"",
		title:"",
		text:"",
		mentor:"",
		time:feedbackToBeEdited.time,
	});

	console.log(editedFeedback);
	//POST updated feedback to the API-DB
	const options = {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(editedFeedback),
	};

	const saveFeedback =() => {
		fetch(`/api/students/${student._id}/feedback/${feedbackToBeEdited.id}`, options)
			.then( (res) => res.json())
			.then((data) => {
				console.log(data);updateFeedback();
			})
			.catch((error) => console.log(error));
		alert("Feedback Updated Successfully");
		noShowPage();
	};

	const handleValueChange = (e) => {
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
						<select
							value={editedFeedback.module}
							name="module"
							onChange={handleValueChange}
						>
							<option value="" defaultValue disabled hidden>{feedbackToBeEdited.module}</option>
							{modules.map((module,index) => <option value={module.name} key={index}>{module.name}</option>)}
						</select>
					</div>

					<div>
						<input className="feedback-title"
							type="text"
							name="title"
							value={editedFeedback.title}
							onChange={handleValueChange}
							placeholder={feedbackToBeEdited.title}
						>
						</input>
					</div>
					<div>
						<textarea
							className="feedback-message"
							name="text"
							value={editedFeedback.text}
							onChange={handleValueChange}
							placeholder={feedbackToBeEdited.text}
						></textarea>
					</div>

					<div>
						<input
							className="input-name"
							type="text"
							name="mentor"
							value={editedFeedback.mentor}
							onChange={handleValueChange}
							placeholder={feedbackToBeEdited.mentor}
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


