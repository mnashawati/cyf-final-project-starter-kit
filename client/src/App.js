import React from "react";
import "./App.css";
import StudentsGrid from "./components/StudentsGrid/index.js";
import StudentProfile from "./components/StudentProfile";
import RegionsGrid from "./components/RegionsGrid";
import { BrowserRouter as Router, Route } from "react-router-dom";

export function App() {

	return (
		<Router>
			<Route exact path="/regions" component={() => <RegionsGrid />} />
			<Route exact path="/regions/:regionName/students" component={() => <StudentsGrid />} />
			<Route exact path="/regions/:regionName/students/:studentName" component={() => <StudentProfile />} />
		</Router>
	);
}

export default App;
