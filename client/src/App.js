import React from "react";
import "./App.css";
import StudentsContextProvider from "./contexts/StudentsContext";
import StudentsGrid from "./components/StudentsGrid/index.js";
import StudentProfile from "./components/StudentProfile";
import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";


export function App() {

	return (
		<StudentsContextProvider>
			<Router>
				<Route exact path="/students" component={()=> <StudentsGrid />} />
				<Route exact path="/students/:name" component={()=> <StudentProfile />} />
			</Router>
		</StudentsContextProvider>
	);
}

export default App;
