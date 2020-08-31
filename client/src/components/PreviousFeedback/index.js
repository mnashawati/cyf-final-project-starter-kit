import React, { useState, useEffect } from "react";
import "./styles.css";
// import { useParams } from "react-router-dom";


const PreviousFeedback = ({ student, givenFeedback }) => {

	//For eventHandlers
	const editFeedback = () => {
		console.log(student);
	};
	//For eventHandlers
	const deleteFeedback = () => {
		console.log("Delete Feedback");
	};

	//Calling data after feedback submitted
	const [allFeedback, setAllFeedback] = useState([]);

	useEffect(() => {
		fetch(`/api/students/${student._id}`)
			.then((res) => res.json())
			.then((student) => {
				setAllFeedback(student.allFeedback);
			})
			.catch((err) => console.log(err));
	}
	, [givenFeedback]);

	return (
		<>
			<p><b>Previous Feedback</b></p>
			<div className="previous-feedback-section">

				{allFeedback.map((item, index)=>{
					const { id, title, module, mentor, text, date } = item;
					return (
						<div key={index} className="previous-feedback-container">
							<div className="previous-feedback-list">
								<p className="feedback-module"><b>MODULE:</b> {module}</p>
								<p className="feedback-title">{title}</p>
								<p className="feedback-text">{text}</p>
								<div className="date-mentor">
									<p className="feedback-date">{date}</p>
									<p className="feedback-mentor">Given by: {mentor}</p>
								</div>
							</div>

							<div className="buttons">
								<button className="previous-feedback-edit" onClick={editFeedback}>EDIT</button>
								<button className="previous-feedback-delete" onClick={() => deleteFeedback(id)}>DELETE</button>
							</div>
						</div>
					);
				})}
			 </div>
		</>
	) ;
} ;

export default PreviousFeedback;
