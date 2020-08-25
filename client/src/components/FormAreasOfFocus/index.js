/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";

const FormAreasOfFocus = () => {

	const [areasOfFocus, setAreasOfFocus] = useState(
		{
			toWorkOn: [],
			okayAt: [],
			goodAt: [],
		},
	);

	const [area, setArea] = useState({
		message: "",
		level: "",
	});

	const addTheLevelToAreas = () => {
		area.level === "To work on"
			? setAreasOfFocus({
				...areasOfFocus,
				toWorkOn: [
					...areasOfFocus.toWorkOn,
					area.message,
				],
			})
			: area.level === "Okay at"
				? setAreasOfFocus({
					...areasOfFocus,
					okayAt: [
						...areasOfFocus.okayAt, area.message,
					],
				})
				: area.level === "Good at"
					? setAreasOfFocus({
						...areasOfFocus,
						goodAt: [
							...areasOfFocus.goodAt, area.message,
						],
					})
					: null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addTheLevelToAreas();
		e.target.reset();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<p className="areas-input-label">
          Add area of focus:
				</p>
			</div>
			<div className="input-lights-add-button-container">
				<div className="area-input-section">
					<input
						className="areas-input"
						type="text"
						name="area"
						placeholder="eg. CSS, useEffect Hook, for loop..."
						onChange={(e) =>
							setArea({
								...area,
								message: e.target.value,
							})
						}
					/>
				</div>
				<div className="lights-section">
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="area"
						value="To work on"
						onChange={(e) =>
							setArea({
								...area,
								level: e.target.value,
							})
						}
					></input>
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="area"
						value="Okay at"
						onChange={(e) =>
							setArea({
								...area,
								level: e.target.value,
							})
						}
					></input>
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="area"
						value="Good at"
						onChange={(e) =>
							setArea({
								...area,
								level: e.target.value,
							})
						}
					></input>
				</div>
				<div className="add-area-button-section">
					<div>{area.level}</div>
					<div>
						<button className="add-area-button">
              Add area
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default FormAreasOfFocus;