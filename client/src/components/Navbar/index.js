import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
	return (
		<div className="navbar-container">
			<div className="navbar-links">
				<Link
					className="homepage-route-link"
					to={{ pathname: "/" }}
				>
					<img src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
						alt="Code Your Future's logo" className="CYF-logo" />
					<h3>Feedback Tracker</h3>
				</Link>
				<div className="syllabus-link">
					<a href="https://syllabus.codeyourfuture.io/" rel="noreferrer" target="_blank">
					Syllabus
					</a>
				</div>
				<Link
					className="regions-route-link"
					to={{ pathname: "/regions" }}
				>
					<p>Regions</p>
				</Link>
			</div>
			<div className="navbar-buttons">
				<Link
					className="register-route-link"
					to={{ pathname: "/register" }}
				>
					<p>Register</p>
				</Link>
				<Link
					className="login-route-link"
					to={{ pathname: "/login" }}
				>
					<p>Log In</p>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;