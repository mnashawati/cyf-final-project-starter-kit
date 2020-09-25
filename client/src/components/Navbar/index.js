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
	console.log("history", history);
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
			{location.pathname == "/regions/London/students" ? (
				<div className='navigation-btn-container'>
					{currentUser && location.pathname !== "/" && currentUser && location.pathname !== "/regions" ? (
						<Navigation
							history={history}
							title={"Go back to regions"}
						/>
					) : null}
				</div>
			) : <div className='navigation-btn-container'>
				{currentUser && location.pathname !== "/" && currentUser && location.pathname !== "/regions" ? (
					<Navigation
						history={history}
						title={"Go back to students"}
					/>
				) : null}
			</div>}
			<div className='sign-out-btn-div'>
				{currentUser && <SignOut />}
			</div>
		</div>
	);
};

export default Navbar;
