/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import FeedbackItem from "../FeedbackItem";
import PropTypes from "prop-types";
import "./styles.css";
import Pagination from "../Pagination/index";
import getFilteringData from "../../helperFunctions/getFilteringData";


const FeedbackList = ({ student, updateStudentData }) => {
	const [selectedModule, setSelectedModule] = useState("All modules");
	const [selectedMentor, setSelectedMentor] = useState("All mentors");

	//PAGINATION
	const [currentPage, setCurrentPage] = useState(1);
	const feedbackPerPage = 3;

	const filteredFeedback = [ ...student.allFeedback.sort((a, b) => {
		return a.time > b.time ? -1 : b.time > a.time ? 1 : 0;
	}),
	]
		.filter((feedback) => selectedModule === "All modules" ? true : selectedModule === feedback.module )
		.filter((feedback) => selectedMentor === "All mentors" ? true : selectedMentor === feedback.mentor );

	function sortThings(a, b) {
		a = a.toLowerCase();
		b = b.toLowerCase();
		return a > b ? 1 : b > a ? -1 : 0;
	}
	//	All mentors/modules sorted alphabetically, repetition removed
	const modules = getFilteringData(filteredFeedback, "module").sort();
	const mentors = getFilteringData(filteredFeedback, "mentor").sort(
		sortThings
	);

	// PAGINATION settings per page
	const indexOfLastFeedback = currentPage * feedbackPerPage; //3
	const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage; //3-3
	const currentFeedbacks = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback ); //(0,3)

	return currentFeedbacks.length ? (
		<div className="previous-feedback-section-container">
			<div className="previous-feedback-section">
				<div className="previous-feedback-title-and-container">
					<h3 className="previous-feedback-title">
                        Feedback List
					</h3>
					<div className="filtered-feedback-counter-div">
						<p className="filtered-feedback-counter">{`${filteredFeedback.length}/${student.allFeedback.length}`}</p>
						<p className="filtered-feedback-counter-text">
                            feedbacks
						</p>
					</div>
				</div>
				<div>
					<div className="module-mentor-filters-container">
						<div className="filter-by-module-container">
							<h6>Filter by Module:</h6>
							<select
								className="select-module"
								name="filter-by-module"
								value={selectedModule}
								onChange={(e) =>
									setSelectedModule(e.target.value)
								}
							>
								<option>All modules</option>
								{modules.map((module, index) => (
									<option key={index} value={module}>
										{module}
									</option>
								))}
							</select>
						</div>
						<div className="filter-by-mentor-container">
							<h6>Filter by Mentor:</h6>
							<select
								className="select-mentor"
								name="filter-by-mentor"
								value={selectedMentor}
								onChange={(e) =>
									setSelectedMentor(e.target.value)
								}
							>
								<option>All mentors</option>
								{mentors.map((mentor, index) => (
									<option key={index} value={mentor}>
										{mentor}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<br />
				<div className="feedback-pages-section">
					{currentFeedbacks.map((feedback, index) => (
						<div className="feedback-object-section" key={index}>
							<FeedbackItem
								feedbackItem={feedback}
								student={student}
								updateStudentData={updateStudentData}
							/>
						</div>
					))}
				</div>
			</div>
			<Pagination
				itemsPerPage={feedbackPerPage}
				totalItems={filteredFeedback.length}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	) : (
		<div className="no-feedback-found-warning-container">
			<p className="no-feedback-found-warning">
				{" "}
                No feedback given! Please leave a feedback...{" "}
			</p>
		</div>
	);
};

FeedbackList.propTypes = {
	student: PropTypes.object.isRequired,
	updateStudentData: PropTypes.func.isRequired,
};

export default FeedbackList;


