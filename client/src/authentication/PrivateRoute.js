import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

	const { currentUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) => currentUser ? (
				<RouteComponent {...routeProps} />
			)
				: <h2>Loading................................</h2>
				// : <Redirect to={"/"} />
			}
		/>
	);
};

export default PrivateRoute;