import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

	const { currentUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) => currentUser ? (
				<RouteComponent {...routeProps} />
			): <div className="loading-component">
				<img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" alt="loading" />
			</div>
			}
		/>
	);
};

export default PrivateRoute;
