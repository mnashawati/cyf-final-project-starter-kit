import React from "react";
import "./styles.css";
import html5 from "../../db/logos/html5.png";
import css3 from "../../db/logos/css3.png";
import js from "../../db/logos/js.png";
import react from "../../db/logos/react.png";
import nodejs from "../../db/logos/nodejs.png";
import mongodb from "../../db/logos/mongoDB.png";

const TechnologiesGrid = () => {
	return (
		<div className="technologies-container">
			<div className="html-card">
				<img src={html5} className="tech-logo" alt="html5-logo" />
			</div>
			<div className="css-card">
				<img src={css3} className="tech-logo" alt="css3-logo" />
			</div>
			<div className="js-card">
				<img src={js} className="tech-logo" alt="javascript-logo" />
			</div>
			<div className="react-card">
				<img src={react} className="tech-logo" alt="react-logo" />
			</div>
			<div className="nodejs-card">
				<img src={nodejs} className="tech-logo" alt="node-js-logo" />
			</div>
			<div className="mongo-card">
				<img src={mongodb} className="tech-logo" alt="mongo-db-logo" />
			</div>
		</div>
	);
};

export default TechnologiesGrid;
