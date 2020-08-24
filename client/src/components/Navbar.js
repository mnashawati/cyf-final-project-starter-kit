import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
	return <div className="navbar-container">
		<Link
			className="navbar-route-link"
			to={{ pathname: "/students" }}
		><h3>Feedbak Tracker</h3></Link>
	</div>;
};

export default Navbar;