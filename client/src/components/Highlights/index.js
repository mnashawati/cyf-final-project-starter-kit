import React, { useState, useEffect } from "react";
import "./styles.css";
import HighlightsForm from "../HighlightsForm/index.js";
import uuid from "react-uuid";
import PropTypes from "prop-types";

const Highlights = ({ student }) => {
	const [highlights, setHighlights] = useState(
		student.highlights
	);

	useEffect(() => {
		fetch(`/api/students/${student._id}/highlights`, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(highlights),
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	}, [highlights, student._id]);

	const addHighlight = (highlight) => {
		highlight.level === "To work on"
			? setHighlights({
				...highlights,
				toWorkOn: [
					...highlights.toWorkOn,
					{ message: highlight.message, id: uuid() },
				],
			})
			: highlight.level === "Okay at"
				? setHighlights({
					...highlights,
					okayAt: [
						...highlights.okayAt,
						{ message: highlight.message, id: uuid() },
					],
				})
				: highlight.level === "Good at"
					? setHighlights({
						...highlights,
						goodAt: [
							...highlights.goodAt,
							{ message: highlight.message, id: uuid() },
						],
					})
					: null;
	};

	const removeHighlight = (highlightId, level) => {
		const updatedHighlights = highlights[level].filter(
			(highlight) => highlight.id !== highlightId
		);
		setHighlights({
			...highlights,
			[level]: updatedHighlights,
		});
	};
	return highlights ? (
		<div className="highlights-section">
			<HighlightsForm addHighlight={addHighlight} />
			<div className="highlights-wrapper">
				<div>
					<h6 className="highlights-subtitles">
              To work on...
					</h6>
					<div className="highlights-section-red">
						{highlights.toWorkOn.map((item, index) => (
							<div key={index}>
								<button className="btn-danger highlights-button to-work-on-btn">
									{item.message}
									<span
										className="x-button"
										onClick={() =>
											removeHighlight(item.id, "toWorkOn")
										}
									>
                    X
									</span>
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="okay-at-section">
					<h6 className="highlights-subtitles">
            Okay at...
					</h6>
					<div className="highlights-section-yellow">
						{highlights.okayAt.map((item, index) => (
							<div key={index}>
								<button className="btn-warning highlights-button okay-at-btn">
									{item.message}
									<span
										className="x-button"
										onClick={() =>
											removeHighlight(item.id, "okayAt")
										}
									>
                    X
									</span>
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="good-at-section">
					<h6 className="highlights-subtitles">
            Good at...
					</h6>
					<div className="highlights-section-green">
						{highlights.goodAt.map((item, index) => (
							<div key={index}>
								<button
									className="btn-success highlights-button good-at-btn"
									key={index}
								>
									{item.message}
									<span
										className="x-button"
										onClick={() =>
											removeHighlight(item.id, "goodAt")
										}
									>
                    X
									</span>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	) : null;
};

Highlights.propTypes = {
	student: PropTypes.object.isRequired,
};

export default Highlights;
