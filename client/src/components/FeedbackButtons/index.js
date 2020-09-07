import React from "react";
import "./styles.css";

function FeedbackButtons({ item, handleEdit, handleDelete }) {
	return (
		<div className="buttons">
			<button className="previous-feedback-edit" onClick={() => handleEdit(item)}>EDIT</button>
			<button className="previous-feedback-delete" onClick={() => handleDelete(item.id)}>DELETE</button>
		</div>
	);
}

export default FeedbackButtons;