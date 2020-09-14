import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";
import PropTypes from "prop-types";

const AllFeedback = ({ student }) => {

	const [allFeedback, setAllFeedback] = useState(student.allFeedback);

	//Call data after feedback submitted
	// const updateFeedback = () => {
	// 	fetch(`/api/students/${student._id}`)
	// 		.then((res) => res.json())
	// 		.then((student) => setAllFeedback(student.allFeedback.reverse()))
	// 		.catch((err) => console.log(err));
	// };

	//Render the page on first load
	useEffect(()=>{
<<<<<<< HEAD
		setAllFeedback(student.allFeedback);
	}, [student]);
=======
		updateFeedback()
	}, []);
>>>>>>> 968f90a69e23cab29bd365f51848565a7d9154a6

	return (
		<div>
			<FeedbackForm
			// updateFeedback={updateFeedback}
				student={student} />
			<PreviousFeedback
				student={student}
				allFeedback={allFeedback}
				// updateFeedback={updateFeedback}
			/>
		</div>
	);
};

AllFeedback.propTypes = {
	student: PropTypes.object.isRequired,
};

export default AllFeedback;