import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";
import EditFeedback from "../EditFeedback";

const AllFeedback = ({ student }) => {

	const [allFeedback, setAllFeedback] = useState([]);
	const [feedbackToBeEdited, setFeedbackToBeEdited] = useState ({});
	const [showComponent, setShowComponent] = useState(false);

	//Call data after feedback submitted
	const updateFeedback = () => {
		fetch(`/api/students/${student._id}`)
			.then((res) => res.json())
			.then((student) => setAllFeedback(student.allFeedback.reverse()))
			.catch((err) => console.log(err));
	};

	//Render the page on first load
	useEffect(()=>{
		updateFeedback();
	}, []);

	const feedbackToEdit = (feedback) => {
		setShowComponent(true);
		setFeedbackToBeEdited(feedback);
	};

	const noShowPage = () => {
		setShowComponent(false);
	};

	return (
		<div>
			<FeedbackForm updateFeedback={updateFeedback} student={student} />
			{ showComponent ? <EditFeedback
				feedbackToBeEdited={feedbackToBeEdited}
				noShowPage = {noShowPage}
				updateFeedback={updateFeedback}
				student={student}
			/> : null}
			<PreviousFeedback
				student={student}
				allFeedback={allFeedback}
				updateFeedback={updateFeedback}
				feedbackToEdit={feedbackToEdit} />
		</div>
	);
};

export default AllFeedback;