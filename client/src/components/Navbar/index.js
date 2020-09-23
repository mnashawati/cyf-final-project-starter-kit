import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../authentication/Auth";
import SignOut from "../../authentication/SignOut";

const Navbar = ({ linkClassName, linkPathName, linkContent }) => {

	const { currentUser } = useContext(AuthContext);

	console.log("link stuff", linkClassName, linkPathName, linkContent );
	return (
		<div className="navbar-container">
			<div className="navbar-links">
				<Link
					className="homepage-route-link"
					to={currentUser? { pathname: "/regions" } : { pathname: "/" }}
				>
					<img src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
						alt="Code Your Future's logo" className="CYF-logo" />
					<p>Feedback Tracker</p>
				</Link>
				{currentUser && linkPathName && <Link
					className={linkClassName}
					to={{ pathname: linkPathName }}
				>
					{linkContent}
				</Link>}
			</div>
			<div className="sign-out-btn-div">
				{currentUser && <SignOut />}
			</div>
		</div>
	);
};

export default Navbar;