/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";

import "./styles.css";

const AreasOfFocusInput = ({ addNewArea }) => {
	const [area, setArea] = useState({
		message: "",
		level: "",
	});

	const handleSubmit = (e) => {
		if (!area.message) {
			return alert("Please add an area");
		} else if (!area.level) {
			return  alert("Please select a level");
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
		<div className="area-form-section">
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
							maxLength={15}
							onChange={handleChange}
						/>
					</div>
					<div className="lights-section">
						<div>
							<label className="radio-circle-section-red">
								<input
									className="send-input-red"
									type="radio"
									id="male"
									name="level"
									value="To work on"
									onChange={handleChange}
								></input>
								<span className="circle-red"></span>
							</label>
						</div>
						<div>
							<label className="radio-circle-section-yellow">
								<input
									className="send-input-red"
									type="radio"
									id="male"
									name="level"
									value="Okay at"
									onChange={handleChange}
								></input>
								<span className="circle-yellow"></span>
							</label>
						</div>
						<div>
							<label className="radio-circle-section-green">
								<input
									className="send-input-green"
									type="radio"
									id="male"
									name="level"
									value="Good at"
									onChange={handleChange}
								></input>
								<span className="circle-green"></span>
							</label>
						</div>
					</div>
					<div className="add-area-button-section">
						<div className="area-display">{area.level}</div>
						<div className="buton-wrapper">
							<button className="add-area-button">Post area</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AreasOfFocusInput;
