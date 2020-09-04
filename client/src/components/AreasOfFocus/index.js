/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import "./styles.css";
import AreasOfFocusForm from "../AreasOfFocusForm/index.js";


const AreasOfFocus = ({ student }) => {

	const [areasOfFocus, updateAreaOfFocus] = useState(student.areasOfFocus);

	const [area, setArea] = useState({
		message: "",
		level: "",
	});

	const options = {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(area),
	};

	const postAreaOfFocus = () => {
		fetch(`/api/students/${student._id}`, options)
			.then((res) => res.json())
			.catch((error) => console.log(error));
	};

	const addTheLevelToAreas = () => {
		area.level === "To work on"
			? updateAreaOfFocus({
				...areasOfFocus,
				toWorkOn: [...areasOfFocus.toWorkOn, area.message],
			})
			: area.level === "Okay at"
				? updateAreaOfFocus({
					...areasOfFocus,
					okayAt: [...areasOfFocus.okayAt, area.message],
				})
				: area.level === "Good at"
					? updateAreaOfFocus({
						...areasOfFocus,
						goodAt: [...areasOfFocus.goodAt, area.message],
					})
					: null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addTheLevelToAreas();
		postAreaOfFocus();
		e.target.reset();
	};

	return areasOfFocus ? (
		<div className="areas-of-focus-section">
			<h3 className="area-of-focus-title">
        Areas of focus
			</h3>
			<div className="need-to-work-on-section">
				<h3 className="subtitle-text">
          Need to work on...
				</h3>
				<div className="area-text-section-red">
					{areasOfFocus.toWorkOn.map((item, index) => (
						<div key={index}>
							<button
								className={ "areas-button-red key-button"}
							>
								{item}
							</button>
							<button
								className="x-button-red"
								onClick={() => {
									console.log("removed");
								}}
							>
								X
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="okay-at-section">
				<h3 className="subtitle-text">Okay at...</h3>
				<div className="area-text-section-yellow">
					{areasOfFocus.okayAt.map((item, index) => (
						<div key={index}>
							<button
								className={"areas-button-yellow key-button"}
							>
								{item}
							</button>
							<button
								className="x-button-yellow"
								onClick={() => {
									console.log("removed");
								}}
							>
								X
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="good-at-section">
				<h3 className="subtitle-text">Good at...</h3>
				<div className="area-text-section-green">
					{areasOfFocus.goodAt.map((item, index)=> (
						<div key={index}>
							<button
								className={"areas-button-green key-button" }
								key={index}
							>
								{item}
							</button>
							<button
								className="x-button-green"
								onClick={() => {
									console.log("removed");
								}}
							>
								X
							</button>
						</div>
					))}
				</div>
			</div>
			<AreasOfFocusForm student={student} area={area} setArea={setArea} handleSubmit={handleSubmit} />
		</div>
	) : null;
};

export default AreasOfFocus;