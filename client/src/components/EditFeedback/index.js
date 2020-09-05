import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";

const EditFeedback = ({ feedbackToBeEdited, noShowPage, updatePreviousFeedback, updateFeedback, student }) => {
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
		console.log(editedFeedback);
		fetch(`/api/students/${student._id}/feedback/${feedbackToBeEdited.id}`, options)
			.then( (res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
		// updateFeedback();
		alert("Feedback Updated Successfully");
	};

	const handleValueChange = (e) => {
		setEditedFeedback({ ...editedFeedback, [e.target.name] : e.target.value });
	};

	const cancelEditFeedback = () => {
		noShowPage();
	};

	const handleSubmit = () => {
		return 1;
	};

	return feedbackToBeEdited ? (
		<>
			<div className="edit-previous-feedback-section">
				<form
					action="" className="feedback-form" onSubmit={handleSubmit} >
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
							className="feedback-time"
							type="text"
							name="time"
							value={feedbackToBeEdited.time}
						/>
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
					<button className="save-edited-feedback" onClick={()=> saveFeedback()}>SAVE</button>
					<button className="cancel-edit-feedback" onClick={() => cancelEditFeedback()}>CANCEL</button>
				</div>
			</div>
		</>
	) : null;
};

export default EditFeedback;


