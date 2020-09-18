import React from "react";
import "./styles.css";
import img from "./05.jpg";
import TechnologiesGrid from "../TechnologiesGrid";
import Login from "../../authentication/Login";

const HomepageHeroSection = () => {
	return (
		<div className="container">
			<div className="hero-section row">
				<div className="cover-image-div col-12 lg-col-6">
					<img className="cover-image" src={img} alt="students-and-mentor-cover" />
				</div>
				<div className="home-page-right-section col-12 lg-col-6">
					<div className="app-info">
						<h3>Introducing Feedback Tracker</h3>
						<ul>
							<li>Access students information</li>
							<li>Provide students feedback</li>
							<li>Check students progress</li>
						</ul>
					</div>
					<div className="sign-in-section-container">
						<h2>Please sign in to see students:</h2>
						<Login />
					</div>
				</div>
			</div>
			<TechnologiesGrid />
		</div>
	);
};

export default HomepageHeroSection;
