/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import "./styles.css";
import FormAreasOfFocus from "../FormAreasOfFocus/index.js";

const AreasOfFocus = () => {

	return (
		<div className="areas-of-focus-section">
			<h3 className="area-of-focus-title">
        Areas of focus
			</h3>
			<div className="need-to-work-on-section">
				<h3 className="subtitle-text">
          Need to work on...
				</h3>
				<div className="area-text-section-red">
					<button className="dummy-button">CSS</button>
				</div>
			</div>
			<div className="okay-at-section">
				<h3 className="subtitle-text">Okay at...</h3>
				<div className="area-text-section-yellow">
					<button className="dummy-button">CSS</button>
				</div>
			</div>
			<div className="good-at-section">
				<h3 className="subtitle-text">Good at...</h3>
				<div className="area-text-section-green">
					<button className="dummy-button">CSS</button>
				</div>
			</div>
			<FormAreasOfFocus />
		</div>
	);
};

export default AreasOfFocus;