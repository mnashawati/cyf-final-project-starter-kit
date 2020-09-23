import React from "react";
import "./styles.css";

const Footer = () => {
	return (
		<div className="footer-content-container">
			<div className="footer-links">
				<a href="https://codeyourfuture.io/" rel="noreferrer" target="_blank">
					CodeYourFuture
				</a>
				<a href="https://syllabus.codeyourfuture.io/" rel="noreferrer" target="_blank">
					Syllabus
				</a>
			</div>
			<div className="footer-text">
				<p>© 2020 Code Your Future</p>|
				<p>Team MoTO</p>|
				<p>London Class 6</p>
			</div>
		</div>
	);
};

export default Footer;
