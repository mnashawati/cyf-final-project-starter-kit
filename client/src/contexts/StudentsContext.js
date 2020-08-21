/* eslint-disable react/prop-types */

import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

// we taking a props automatically in StudentsContextProvider function

const StudentsContextProvider = (props) => {
	const [students, setStudents] = useState();


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