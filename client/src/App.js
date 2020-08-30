import React, { useState, useEffect } from "react";
import "./App.css";
import StudentsGrid from "./components/StudentsGrid/index.js";
import StudentProfile from "./components/StudentProfile";
import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";


export function App() {

	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => {
				setStudents(data);
			})
			.catch((err) => console.log(err));
	}
	, []);

	return students ? (
		<Router>
			<Route exact path="/students" component={() => <StudentsGrid students={students} />} />
			<Route exact path="/students/:name" component={() => <StudentProfile />} />
		</Router>

	): null;
}

export default App;
