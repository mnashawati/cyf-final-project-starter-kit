/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import "./styles.css";
import AreasOfFocusForm from "../AreasOfFocusForm/index.js";
import uuid from "react-uuid";
import PropTypes from "prop-types";

const AreasOfFocus = ({ student }) => {

	const [areasOfFocus, setAreaOfFocus] = useState(student.areasOfFocus);

	useEffect(() => {
		fetch(`/api/students/${student._id}/areas-of-focus`, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(areasOfFocus),
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	}, [areasOfFocus, student._id]);

	const addNewArea = (area) => {
		area.level === "To work on"
			? setAreaOfFocus({
				...areasOfFocus,
				toWorkOn: [...areasOfFocus.toWorkOn, { message: area.message, id: uuid() }],
			})
			: area.level === "Okay at"
				? setAreaOfFocus({
					...areasOfFocus,
					okayAt: [...areasOfFocus.okayAt, { message: area.message, id: uuid() }],
				})
				: area.level === "Good at"
					? setAreaOfFocus({
						...areasOfFocus,
						goodAt: [...areasOfFocus.goodAt, { message: area.message, id: uuid() }],
					})
					: null;
	};

	const removeAnArea = (areaId, level) => {
		const updatedAreas = areasOfFocus[level].filter((area) => area.id !== areaId);
		setAreaOfFocus({ ...areasOfFocus, [level]: updatedAreas });
	};

	return areasOfFocus ? (
		<div className="areas-of-focus-section">
			<h3 className="area-of-focus-title">Highlights:</h3>
			<AreasOfFocusForm addNewArea={addNewArea} />
			<div className="need-to-work-on-section">
				<h6 className="subtitle-text">
          Need to work on...
				</h6>
				<div className="area-text-section-red">
					{areasOfFocus.toWorkOn.map((item, index) => (
						<div key={index}>
							<button className="btn-danger high-button">
								{item.message}
								<span
									className="btn-danger x-button"
									onClick={() =>
										removeAnArea(item.id, "toWorkOn")
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
				<h6 className="subtitle-text">Okay at...</h6>
				<div className="area-text-section-yellow">
					{areasOfFocus.okayAt.map((item, index) => (
						<div key={index}>
							<button className="btn-warning high-button">
								{item.message}
								<span
									className="btn-warning x-button"
									onClick={() =>
										removeAnArea(item.id, "okayAt")
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
				<h6 className="subtitle-text">Good at...</h6>
				<div className="area-text-section-green">
					{areasOfFocus.goodAt.map((item, index) => (
						<div key={index}>
							<button
								className="btn-success high-button"
								key={index}
							>
								{item.message}
								<span
									className="btn-success x-button"
									onClick={() =>
										removeAnArea(item.id, "goodAt")
									}
								>
                  X
								</span>
							</button>
						</div>
					))}
				</div>
			</div>
			{/* <AreasOfFocusForm addNewArea={addNewArea} /> */}
		</div>
	) : null;
};

AreasOfFocus.propTypes = {
	student: PropTypes.object.isRequired,
};

export default AreasOfFocus;