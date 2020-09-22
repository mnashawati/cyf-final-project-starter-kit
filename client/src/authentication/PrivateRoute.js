import React, { useContext, useState } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

	const { currentUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) => currentUser ? (
				<RouteComponent {...routeProps} />
			): <div className="loading-component">Loading...</div>
			}
		/>
	);
};

export default PrivateRoute;