import React, { useState, useEffect } from "react";
import app from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

	const [currentUser, setCurrentUser] =  useState();

	useEffect(() => {
		app.auth().onAuthStateChanged(setCurrentUser);
	}, []);

	currentUser
	&& console.log("user", currentUser.displayName);

	return (
		<AuthContext.Provider
			value={{ currentUser }}
		>
			{children}
		</AuthContext.Provider>
	);

};