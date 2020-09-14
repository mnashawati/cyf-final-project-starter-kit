import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/Login";
import RegionsGrid from "./components/RegionsGrid";
import StudentsGrid from "./components/StudentsGrid/index.js";
import StudentProfile from "./components/StudentProfile";

export function App() {

	return (
		<Router>
			<Route exact path="/" component={() => <HomePage />} />
			<Route exact path="/login" component={() => <LoginForm />} />
			<Route exact path="/regions" component={() => <RegionsGrid />} />
			<Route exact path="/regions/:regionName/students" component={() => <StudentsGrid />} />
			<Route exact path="/regions/:regionName/students/:studentName" component={() => <StudentProfile />} />
		</Router>
	);
}

export default App;
