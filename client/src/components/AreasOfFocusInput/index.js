import React, { useState } from "react";

import "./styles.css";

const AreasOfFocusInput = ({ addNewArea }) => {
	const [area, setArea] = useState({
		message: "",
		level: "",
	}); // { message: "" level: "" id: "" }

	const handleSubmit = (e) => {
		if (!area.message) {
			return alert("Please add an area");
		} else if (!area.level) {
			return alert("Please select a level");
		}
		e.preventDefault();
		addNewArea(area);
		e.target.reset();
		setArea({});
	};

	const handleChange = (e) => {
		setArea({ ...area, [e.target.name] : e.target.value });
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
						name="message"
						placeholder="eg. CSS, useEffect Hook..."
						maxLength={15}
						onChange={handleChange}
					/>
				</div>
				<div className="lights-section">
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="level"
						value="To work on"
						onChange={handleChange}
					></input>
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="level"
						value="Okay at"
						onChange={handleChange}
					></input>
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="level"
						value="Good at"
						onChange={handleChange}
					></input>
				</div>
				<div className="add-area-button-section">
					<div className="area-display">{area.level}</div>
					<div className="buton-wrapper">
						<button className="add-area-button">Add</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default AreasOfFocusInput;
