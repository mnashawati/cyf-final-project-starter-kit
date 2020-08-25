import React, { useState } from "react";

const FormAreasOfFocus = () => {

	const [areasOfFocus, setAreasOfFocus] = useState([
		{
			toWorkOn: [""],
			okayAt: [""],
			goodAt: [""],
		},
	]);

	const [areaForm, setAreaForm] = useState({
		message: "",
		light: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
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
							setAreaForm({
								...areaForm,
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
						value="red"
						onChange={(e) =>
							setAreaForm({
								...areaForm,
								light: e.target.value,
							})
						}
					></input>
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="area"
						value="yellow"
						onChange={(e) =>
							setAreaForm({
								...areaForm,
								light: e.target.value,
							})
						}
					></input>
					<input
						className="send-input-red"
						type="radio"
						id="male"
						name="area"
						value="green"
						onChange={(e) =>
							setAreaForm({
								...areaForm,
								light: e.target.value,
							})
						}
					></input>
				</div>
				<div className="add-area-button-section">
					<div>Good at..</div>
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