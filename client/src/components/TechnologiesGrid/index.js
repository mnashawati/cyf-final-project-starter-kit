import React from "react";
import "./styles.css";
import "../RegionsGrid/grid.css";

const TechnologiesGrid = () => {
	return (
		<div className="technologies-container">
			<div className="row">
				<div className="col-12 sm-col-6 lg-col-4">
					<div className="html-card"></div>

				</div>
				<div className="col-12 sm-col-6 lg-col-4">
					<div className="css-card"></div>

				</div>
				<div className="col-12 sm-col-6 lg-col-4">
					<div className="js-card"></div>

				</div>
				<div className="col-12 sm-col-6 lg-col-4">
					<div className="react-card"></div>

				</div>
				<div className="col-12 sm-col-6 lg-col-4">
					<div className="nodejs-card"></div>

				</div>
				<div className="col-12 sm-col-6 lg-col-4">
					<div className="mongodb-card"></div>

				</div>
			</div>
		</div>
	);
};

export default TechnologiesGrid;
