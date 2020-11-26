import React, { useState, useEffect } from "react";
import app from "./base";
import PropTypes from "prop-types";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

	const [currentUser, setCurrentUser] =  useState(null);

	useEffect(() => {
		app.auth().onAuthStateChanged(setCurrentUser);
	}, []);

	return (
		<AuthContext.Provider
			value={{ currentUser }}
		>
			{children}
		</AuthContext.Provider>
	);

};

AuthProvider.propTypes = {
	children: PropTypes.object.isRequired,
};