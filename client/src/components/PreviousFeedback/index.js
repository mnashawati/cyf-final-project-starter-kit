import React, { useState, useEffect } from "react";
import "./styles.css";


const PreviousFeedback = ({ student, toggleNewFeedback }) => {

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
	, [toggleNewFeedback]);

	return  allFeedback ? (
		<>
			<p><b>Previous Feedback</b></p>
			<div className="previous-feedback-section">
				{allFeedback.map((item, index)=> (
					<div key={index} className="previous-feedback-container">
						<div className="previous-feedback-list">
							<p className="feedback-module"><b>MODULE:</b> {item.module}</p>
							<p className="feedback-title">{item.title}</p>
							<p className="feedback-text">{item.text}</p>
							<div className="date-mentor">
								<p className="feedback-date">{item.date}</p>
								<p className="feedback-mentor">Given by: {item.mentor}</p>
							</div>
						</div>
						<div className="buttons">
							<button className="previous-feedback-edit" >EDIT</button>
							<button className="previous-feedback-delete" onClick={() => deleteFeedback(item.id)}>DELETE</button>
						</div>
					</div>
				))}
			 </div>
		</>
	) : null ;
} ;

export default PreviousFeedback;
