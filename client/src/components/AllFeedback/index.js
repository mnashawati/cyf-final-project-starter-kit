import React, { useState } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";
import PropTypes from "prop-types";
// import { getStudentData } from "../Redux/Actions/studentActions";
// import { connect } from "react-redux";

const AllFeedback = ({ student }) => {
	const [studentData, setStudentData] = useState(student);
	// Call data after feedback submitted
	const updateStudentData = () => {
		fetch(`/api/students/${student._id}`)
			.then((res) => res.json())
			.then((data) => setStudentData(data))
			.catch((err) => console.log(err));
	};
	return (
		<div className="feedback-wrapper">
			<FeedbackForm
				student={studentData}
				updateStudentData={updateStudentData}
			/>
			<PreviousFeedback
				student={studentData}
				updateStudentData={updateStudentData}
			/>
		</div>
	);
};

AllFeedback.propTypes = {
	student: PropTypes.object.isRequired,
};
export default AllFeedback;

// const mapStateToProps = (state) => {
// 	const { students } = state.studentsData;
// 	console.log(students);
// 	return { students };
// };

// const mapDispatchToProps = {
// 	getStudentData,
// };

// AllFeedback.propTypes = {
// 	student: PropTypes.object.isRequired,
// 	getStudentData: PropTypes.func,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AllFeedback);