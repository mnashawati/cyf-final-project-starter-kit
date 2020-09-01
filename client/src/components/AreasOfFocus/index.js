/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import "./styles.css";
import FormAreasOfFocus from "../FormAreasOfFocus/index.js";


const AreasOfFocus = ({ student }) => {

	const { areasOfFocus } = student;

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
						<>
							<button
								className={ "areas-button-red key-button"}
								key={index}
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
						</>
					))}
				</div>
			</div>
			<div className="okay-at-section">
				<h3 className="subtitle-text">Okay at...</h3>
				<div className="area-text-section-yellow">
					{areasOfFocus.okayAt.map((item, index) => (
						<>
							<button
								className={"areas-button-yellow key-button"}
								key={index}
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
						</>
					))}
				</div>
			</div>
			<div className="good-at-section">
				<h3 className="subtitle-text">Good at...</h3>
				<div className="area-text-section-green">
					{areasOfFocus.goodAt.map((item, index)=> (
						<>
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
						</>
					))}
				</div>
			</div>
			<FormAreasOfFocus />
		</div>
	) : null;
};

export default AreasOfFocus;