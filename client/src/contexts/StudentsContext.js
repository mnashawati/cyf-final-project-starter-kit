/* eslint-disable react/prop-types */

import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

const StudentsContextProvider = (props) => {
	const [students, setStudents] = useState();
	console.log("context students---->", students);
	useEffect(() => {
		fetch("http://localhost:3000/api")
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