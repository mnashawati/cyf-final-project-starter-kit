import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm";
import PreviousFeedback from "../PreviousFeedback";
import EditFeedback from "../EditFeedback";

const AllFeedback = ({ student }) => {

	const [allFeedback, setAllFeedback] = useState([]);
	const [feedbackToBeEdited, setFeedbackToBeEdited] = useState ({});
	const [isEditing, setIsEditing] = useState(false);

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
		setIsEditing(true);
		setFeedbackToBeEdited(feedback);
	};

	const noShowPage = () => {
		setIsEditing(false);
	};

	return (
		<div>
			<FeedbackForm updateFeedback={updateFeedback} student={student} />
			{ isEditing ? <EditFeedback
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