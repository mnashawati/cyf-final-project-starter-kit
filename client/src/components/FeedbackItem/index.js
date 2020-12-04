/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import timeDifference from "../../helperFunctions/timeDifference";
import { AuthContext } from "../../authentication/Auth";

const FeedbackItem = ({ feedbackItem, student, updateStudentData }) => {
	const [isEditing, setIsEditing] = useState(false); // Toggle disabled attribute
	const [feedback, setFeedback] = useState({});
	const [showModal, setShowModal] = useState(false);

	// User object from FIREBASE
	const { currentUser } = useContext(AuthContext);
	const mentorsEmail = currentUser.email;

	useEffect(() => {
		setFeedback(feedbackItem);
	}, [feedbackItem]);

	//DON'T allow form submit with empty fields
	const saveFeedback = (id) => {
		if (!feedback.title) {
			return alert("Please add a title");
		} else if (!feedback.text) {
			return alert("Please add your feedback");
		} else if (!feedback.mentor) {
			return alert("Please add your name");
		}
		updateFeedbackData(id);
	};

	//UPDATE feedback at DB
	const updateFeedbackData = (id) => {
		fetch(`/api/students/${student._id}/feedback/${id}`, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(feedback),
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	};

	//DELETE selected feedback
	const handleDelete = (feedbackId) => {
		fetch(`/api/students/${student._id}/${feedbackId}`, {
			method: "DELETE",
			headers: { "Content-type": "application/json" },
		})
			.then((res) => res.json())
			.catch((error) => console.log(error))
			.then(() => updateStudentData());
	};

	// Update object with edited data
	const handleEdit = (e) => {
		setFeedback({
			...feedback,
			[e.target.name]: e.target.value,
		});
	};

	const handleCancel = () => {
		setFeedback(feedbackItem);
		setIsEditing(!isEditing);
	};

	return (
		feedback && (
			<div className="prev-feedback-list">
				<div className="feedback-title-and-module">
					<div className="feedback-title">
						<input
							className="prev-feedback-title-input"
							name={"title"}
							value={feedback.title || ""}
							onChange={handleEdit}
							disabled={!isEditing}
						/>
					</div>
					<div className="feedback-module">
						{!isEditing ? (
							<p className="module-select-p">{`Module: ${feedback.module}`}</p>
						) : (
							<>
								<p className="feedback-input-heading">Module:</p>
								<select
									className="module-select"
									name={"module"}
									value={feedback.module || ""}
									onChange={handleEdit}
								>
									{modules.map((module, index) => (
										<option key={index} value={module.name}>
											{module.name}
										</option>
									))}
								</select>
							</>
						)}
					</div>
				</div>
				<div className="previous-feedback-text">
					<textarea
						className="feedback-text-textarea"
						name={"text"}
						value={feedback.text || ""}
						onChange={handleEdit}
						disabled={!isEditing}
					/>
				</div>
				<div className="feedback-mentor-time-buttons">
					<div className="feedback-mentor-and-time">
						<div className="prev-feedback-mentor">
							<input
								className="prev-feedback-mentor-input"
								name={"mentor"}
								value={`Given by: ${feedback.mentor || ""}`}
								onChange={handleEdit}
								disabled
							/>
						</div>
						<div className="prev-feedback-time">
							<p className="prev-feedback-time-input">
								{timeDifference(Date.now(), feedback.time)}
							</p>
						</div>
					</div>
					{mentorsEmail === feedback.mentorEmail ? (
						<div className="edit-delete-buttons">
							<Button
								variant="success"
								onClick={() => {
									setIsEditing(!isEditing);
									isEditing && saveFeedback(feedback.id);
								}}
								className="edit-save-feedback-btn"
							>
								{!isEditing ? "Edit" : "Save"}
							</Button>

							{!isEditing ? (
								<>
									<Button
										variant="danger"
										onClick={() => {
											setShowModal(true);
										}}
										className="delete-feedback-btn"
									>
                    Delete
									</Button>
									<Modal
										show={showModal}
										onHide={() => {
											setShowModal(false);
										}}
									>
										<Modal.Header closeButton>
											<Modal.Title>Delete feedback?</Modal.Title>
										</Modal.Header>
										<Modal.Body>
											<p>
                        Select cancel if you dont want to delete the feedback!
											</p>
										</Modal.Body>
										<Modal.Footer>
											<Button
												variant="secondary"
												onClick={() => {
													setShowModal(false);
												}}
												className="cancel-delete-feedback-btn"
											>
                        Cancel
											</Button>
											<Button
												variant="danger"
												onClick={() => {
													handleDelete(feedback.id);
													setShowModal(false);
												}}
												className="confirm-delete-feedback-btn"
											>
                        Delete
											</Button>
										</Modal.Footer>
									</Modal>
								</>
							) : (
								<Button
									variant="outline-danger"
									onClick={handleCancel}
									className="cancel-edit-feedback-btn"
								>
                  Cancel
								</Button>
							)}
						</div>
					) : null}
				</div>
			</div>
		)
	);
};

FeedbackItem.propTypes = {
	student: PropTypes.object.isRequired,
	feedbackItem: PropTypes.object.isRequired,
	updateStudentData: PropTypes.func,
};

export default FeedbackItem;
