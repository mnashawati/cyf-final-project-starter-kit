import React, { useState } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";
import PropTypes from "prop-types";
// import { updateStudentData } from "../Redux/Actions/studentActions";
// import { connect } from "react-redux";

const AllFeedback = ({ student }) => {
	const [studentData, setStudentData] = useState(student);
	// Call data after feedback submitted
	const updateFeedback = () => {
		fetch(`/api/students/${student._id}`)
			.then((res) => res.json())
			.then((data) => setStudentData(data))
			.catch((err) => console.log(err));
	};
	return (
		<div className="feedback-wrapper">
			<FeedbackForm
				student={studentData}
				updateFeedback={updateFeedback}
			/>
			<PreviousFeedback
				student={studentData}
				// allFeedback={allFeedback}
				updateFeedback={updateFeedback}
			/>
		</div>
	);
};
AllFeedback.propTypes = {
	student: PropTypes.object.isRequired,
};
export default AllFeedback;