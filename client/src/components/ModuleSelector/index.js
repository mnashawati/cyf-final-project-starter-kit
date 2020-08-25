import React, { useState } from "react";
import modules from "../db/modules.json";

const ModuleSelector = () => {

	const [selected, setSelected] = useState("Select a module");

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	return (

		<select value={selected} onChange={handleSelect}>
			<option>Select a module</option>
			{modules.map((module,index) => <option value={module.name} key={index}>{module.name}</option>)}
		</select>

	);
};

export default ModuleSelector;