/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from "react";
import "./styles.css";
import AreasOfFocusForm from "../AreasOfFocusForm/index.js";
import uuid from "react-uuid";

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
	});

	const addTheLevelToAreas = (area) => {
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


	const removeAreaToWorkOn = (areaId) => {
		const updatedAreas = areasOfFocus.toWorkOn.filter((area) => area.id !== areaId);
		setAreaOfFocus({ ...areasOfFocus, toWorkOn: updatedAreas });
	};

	const removeAreaOkayAt = (areaId) => {
		const updatedAreas = areasOfFocus.okayAt.filter((area) => area.id !== areaId);
		setAreaOfFocus({ ...areasOfFocus, okayAt: updatedAreas });
	};

	const removeAreaGoodAt = (areaId) => {
		const updatedAreas = areasOfFocus.goodAt.filter((area) => area.id !== areaId);
		setAreaOfFocus({ ...areasOfFocus, goodAt: updatedAreas });
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
								className={"areas-button-red key-button"}
							>
								{item.message}
							</button>
							<button
								className="x-button-red"
								onClick={() => {
									removeAreaToWorkOn(item.id);
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
								{item.message}
							</button>
							<button
								className="x-button-yellow"
								onClick={() => {
									removeAreaOkayAt(item.id);
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
					{areasOfFocus.goodAt.map((item, index) => (
						<div key={index}>
							<button
								className={"areas-button-green key-button"}
								key={index}
							>
								{item.message}
							</button>
							<button
								className="x-button-green"
								onClick={() => {
									removeAreaGoodAt(item.id);
								}}
							>
                X
							</button>
						</div>
					))}
				</div>
			</div>
			<AreasOfFocusForm
				addTheLevelToAreas={addTheLevelToAreas}
			/>
		</div>
	) : null;
};

export default AreasOfFocus;