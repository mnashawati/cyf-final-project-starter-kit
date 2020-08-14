import React, { useEffect, useState } from "react";

import "./App.css";
import { getMessage } from "./service";
import logo from "./logo.svg";
import StudentsGrid from "./components/StudentsGrid";


export function App() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		getMessage().then((message) => setMessage(message));
	}, []);

	return (
		<div >
			<div>
				<main role="main">
					<div>
						<img
							className="logo"
							data-qa="logo"
							src={logo}
							alt="Just the React logo"
						/>
						<h1 className="message" data-qa="message">
							{message}
						</h1>
					</div>
				</main>
			</div>
			<StudentsGrid />
		</div>

	);
}

export default App;
