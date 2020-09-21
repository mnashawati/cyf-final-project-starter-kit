import React from "react";
import "./styles.css";
import img from "./05.jpg";
import TechnologiesGrid from "../TechnologiesGrid";
import SignIn from "../../authentication/SignIn";

const HomepageHeroSection = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="cover-image-container">
					<img className="cover-image" src={img} alt="students-and-mentor-cover" />
				</div>
				<div className="app-info-sign-in-container">
					<div className="app-info-sign-in">
						<div className="app-info">
							<h4>Feedback Tracker</h4>
							<ul>
								<li>Access students information</li>
								<li>Provide students feedback</li>
								<li>Check students progress</li>
							</ul>
						</div>
						<SignIn />
					</div>
				</div>
			</div>
			<TechnologiesGrid />
		</div>
	);
};

export default HomepageHeroSection;
