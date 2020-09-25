import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../authentication/Auth";
import SignOut from "../../authentication/SignOut";
import Navigation from "../Navigation/index";
import "./styles.css";

const Navbar = () => {

	const { currentUser } = useContext(AuthContext);
	const history = useHistory();
	let location = useLocation();

	return (
		<div className='navbar-container'>
			<div className='navbar-links'>
				<Link
					className='homepage-route-link'
					to={
						currentUser
							? { pathname: "/regions" }
							: { pathname: "/" }
					}
				>
					<img
						src='https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png'
						alt="Code Your Future's logo"
						className='CYF-logo'
					/>
					<p>Feedback Tracker</p>
				</Link>
			</div>
			<div className='navigation-btn-container'>
				{currentUser && location.pathname !== "/" ? <Navigation history={history} /> : null}
			</div>
			<div className='sign-out-btn-div'>
				{currentUser && <SignOut />}
			</div>
		</div>
	);
};

export default Navbar;
