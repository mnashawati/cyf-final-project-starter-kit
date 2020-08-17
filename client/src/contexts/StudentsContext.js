/* eslint-disable react/prop-types */

import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

// we taking a props automaticaly in StudentsContextProvider function

const StudentsContextProvider = (props) => {
	const [students, setStudents] = useState();
	console.log("context students---->", students);

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => {
				setStudents(data);
			})
			.catch((err) => console.log(err));
	}
	, []);

	return (
		<StudentsContext.Provider value={{ students, setStudents }}>
			{props.children}
		</StudentsContext.Provider>
	);
};

export default StudentsContextProvider;