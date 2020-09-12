import React from "react";
import "./styles.css";
import "../RegionsGrid/grid.css";

const TechnologiesGrid = () => {
	return (
		<div className="technologies-container">
			<div className="html-card"></div>
			<div className="css-card"></div>
			<div className="js-card"></div>
			<div className="react-card"></div>
			<div className="nodejs-card"></div>
			<div className="mongodb-card"></div>
		</div>
	);
};

export default TechnologiesGrid;
