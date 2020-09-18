import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../authentication/Auth";
import SignOut from "../../authentication/SignOut";

const Navbar = () => {

	const { currentUser } = useContext(AuthContext);

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
			{currentUser && <SignOut />}
		</div>
	);
};

export default Navbar;