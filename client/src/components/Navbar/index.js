import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
	return <div className="navbar-container">
		<Link
			className="navbar-route-link"
			to={{ pathname: "/regions" }}
		><h3>Feedback Tracker</h3>
		</Link>
	</div>;
};

export default Navbar;