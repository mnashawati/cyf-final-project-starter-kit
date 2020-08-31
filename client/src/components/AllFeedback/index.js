import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";

const AllFeedback = ({ student }) => {

	const [toggleNewFeedback, setToggleNewFeedback] = useState(true);

	const updateFeedback = () => {
		setToggleNewFeedback(!toggleNewFeedback);
	};

	return (
		<div>
			<FeedbackForm updateFeedback={updateFeedback} student={student} />
			<PreviousFeedback toggleNewFeedback={toggleNewFeedback} student={student} />
		</div>
	);
};

export default AllFeedback;