import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";


const AreasOfFocusForm = ({ addNewArea }) => {
	const [area, setArea] = useState({
		message: "",
		level: "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!area.message) {
			return alert("Please add an area");
		} else if (!area.level) {
			return alert("Please select a level");
		}
		addNewArea(area);
		e.target.reset();
		setArea({ message: "", level: "" });
	};

	const handleChange = (e) => {
		setArea({ ...area, [e.target.name] : e.target.value });
	};

	return (
		<div className="area-form-section">
			<form onSubmit={handleSubmit} id="add-area-of-focus">
				<div className="add-buton-title-section">
					<p className="areas-input-label">
            Type a topic to highlight:
					</p>
					<div className="add-area-button-wrapper">
						<button className="btn-danger add-button">
              Add
						</button>
					</div>
				</div>
				<div className="input-lights-add-button-container">
					<div className="area-input-section">
						<input
							className={"areas-input"}
							type="text"
							name="message"
							maxLength={15}
							onChange={handleChange}
						/>
					</div>

					<div className="lights-section">
						<div>
							<label
								className="radio-circle-section-red"
								htmlFor="red-radio-button"
							>
								<input
									className="send-input-red"
									type="radio"
									id="red-radio-button"
									name="level"
									value="To work on"
									onChange={handleChange}
									checked=""
								></input>
								<span
									className={
										area.level === "To work on"
											? "circle-red-border"
											: "circle-red"
									}
								></span>
							</label>
						</div>
						<div>
							<label
								className="radio-circle-section-yellow"
								htmlFor="yellow-radio-button"
							>
								<input
									className="send-input-red"
									type="radio"
									id="yellow-radio-button"
									name="level"
									value="Okay at"
									onChange={handleChange}
									checked=""
								></input>
								<span
									className={
										area.level === "Okay at"
											? "circle-yellow-border"
											: "circle-yellow"
									}
								></span>
							</label>
						</div>
						<div>
							<label
								className="radio-circle-section-green"
								htmlFor="green-radio-button"
							>
								<input
									className="send-input-green"
									type="radio"
									id="green-radio-button"
									name="level"
									value="Good at"
									onChange={handleChange}
									checked=""
								></input>
								<span
									className={
										area.level === "Good at"
											? "circle-green-border"
											: "circle-green"
									}
								></span>
							</label>
						</div>
					</div>
					<div className="add-area-button-section">
						<div className="area-display">{area.level}</div>
					</div>
				</div>
			</form>
		</div>
	);
};

AreasOfFocusForm.propTypes = {
	addNewArea: PropTypes.func.isRequired,
};

export default AreasOfFocusForm;
