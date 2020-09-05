import React, { useState } from "react";
import "./styles.css";
import modules from "../../db/modules.json";

const EditFeedback = ({ feedbackEdited, noShowPage }) => {

	const [newValue, setNewValue] = useState({
		id:feedbackEdited.id,
		module:"",
		title:"",
		text:"",
		mentor:"",
	});

	const handleValueChange = (e) => {
		setNewValue({ ...newValue, [e.target.name] : e.target.value });
	};
	const cancelEditFeedback = () => {
		noShowPage();
	};

	const saveFeedback  = () => {
		console.log({ newValue });
	};

	const handleSubmit = () => {
		return 1;
	};

	return feedbackEdited ? (
		<>
			<div className="edit-previous-feedback-section">
				<form
					action="" className="feedback-form" onSubmit={handleSubmit} >
					<div><p className="edit-feedback-label" style={{ textAlign:"center", fontSize:"16px" }}>Update Your Feedback</p>
						<hr style={{ width:"40%", margin:"auto", marginBottom:"8px" }}></hr>
					</div>
					<div>
						<select
							value={newValue.module}
							name="module"
							onChange={handleValueChange}

						>
							<option value="" defaultValue disabled hidden>{feedbackEdited.module}</option>
							{modules.map((module,index) => <option value={module.name} key={index}>{module.name}</option>)}
						</select>
					</div>

					<div>
						<input className="feedback-title"
							type="text"
							name="title"
							value={newValue.title}
							onChange={handleValueChange}
							placeholder={feedbackEdited.title}
						>
						</input>
					</div>
					<div>
						<textarea
							className="feedback-message"
							name="text"
							value={newValue.text}
							onChange={handleValueChange}
							placeholder={feedbackEdited.text}
						></textarea>
					</div>
					<div>
						<input
							className="input-name"
							type="text"
							name="mentor"
							value={newValue.mentor}
							onChange={handleValueChange}
							placeholder={feedbackEdited.mentor}
						/>
					</div>
				</form>
				<div className="buttons">
					<button className="save-edited-feedback" onClick={() => saveFeedback()}>SAVE</button>
					<button className="cancel-edit-feedback" onClick={() => cancelEditFeedback()}>CANCEL</button>
				</div>
			</div>
		</>
	) : null;
};

export default EditFeedback;


