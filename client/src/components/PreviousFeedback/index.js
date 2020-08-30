import React from "react";
import "./styles.css";

const PreviousFeedback = ({ student }) => {

	const { allFeedback } = student;

	return allFeedback ? (
		<>
			<p><b>Previous Feedback</b></p>
			<div className="previous-feedback-section">

				{allFeedback.map((item, index)=>{
					const { title, module, mentor, text, date  } = item;
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
								<button className="previous-feedback-edit">EDIT</button>
								<button className="previous-feedback-delete">DELETE</button>
							</div>
						</div>
					);
				})}
			 </div>
		</>
	) : null ;
} ;

export default PreviousFeedback;
