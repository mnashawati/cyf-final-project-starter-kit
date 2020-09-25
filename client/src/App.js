import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./authentication/SignIn";
import RegionsGrid from "./components/RegionsGrid";
import StudentsGrid from "./components/StudentsGrid/index.js";
import StudentProfile from "./components/StudentProfile";
import { AuthProvider } from "./authentication/Auth";
import PrivateRoute from "./authentication/PrivateRoute";
import SignUp from "./authentication/SignUp";
import Footer from "./components/Footer/index.js";
import Navbar from "./components/Navbar/index.js";

export function App() {

	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Route exact path="/" component={() => <HomePage />} />
				<Route exact path="/sign-in" component={() => <SignIn />} />
				<Route exact path="/register" component={() => <SignUp />} />
				<PrivateRoute exact path="/regions" component={() => <RegionsGrid />} />
				<PrivateRoute exact path="/regions/:regionName/students" component={() => <StudentsGrid />} />
				<PrivateRoute exact path="/regions/:regionName/students/:studentName" component={() => <StudentProfile />} />
				<Footer />
			</Router>
		</AuthProvider>
	);
}

export default App;

//linkClassName={"back-to-students"} linkPathName={`/regions/${student.city}/students`} linkContent={"Back to students"}