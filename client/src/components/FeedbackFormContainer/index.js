import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";

const FeedbackFormContainer = ({ student }) => {


	const [givenFeedback, setGivenFeedback] = useState([]);

	const updateFeedback = (newFeedback) => {

		setGivenFeedback(givenFeedback.push(newFeedback));
	};

	useEffect(() => {
		setGivenFeedback(student.allFeedback);
	}
	, [givenFeedback]);

	return (
		<div>
			<FeedbackForm updateFeedback={updateFeedback} student={student} />
			<PreviousFeedback givenFeedback={givenFeedback} student={student} />
		</div>
	);
};

export default FeedbackFormContainer;