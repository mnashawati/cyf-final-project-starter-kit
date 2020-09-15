import React, { useState } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";
import PropTypes from "prop-types";

const AllFeedback = ({ student }) => {

	const [allFeedback, setAllFeedback] = useState(student.allFeedback);

	// Call data after feedback submitted
	const updateFeedback = () => {
		fetch(`/api/students/${student._id}`)
			.then((res) => res.json())
			.then((student) => {
				setAllFeedback(student.allFeedback);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<FeedbackForm
				updateFeedback={updateFeedback}
				student={student} />
			<PreviousFeedback
				student={student}
				allFeedback={allFeedback}
				updateFeedback={updateFeedback}
			/>
		</div>
	);
};

AllFeedback.propTypes = {
	student: PropTypes.object.isRequired,
};

export default AllFeedback;