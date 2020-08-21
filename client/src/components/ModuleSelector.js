import React from "react";
// import { Dropdown } from "semantic-ui-react";

import modules from "../db/modules.json";


// modules.map(module => { key: module.name.toLowerCase, text: module.name, value: module.name.toLowerCase });
// const options = [
// 	{ key: "angular", text: "Angular", value: "angular" },
// 	{ key: "css", text: "CSS", value: "css" },
// 	{ key: "design", text: "Graphic Design", value: "design" },
// 	{ key: "ember", text: "Ember", value: "ember" },
// 	{ key: "html", text: "HTML", value: "html" },
// 	{ key: "ia", text: "Information Architecture", value: "ia" },
// 	{ key: "javascript", text: "Javascript", value: "javascript" },
// 	{ key: "mech", text: "Mechanical Engineering", value: "mech" },
// 	{ key: "meteor", text: "Meteor", value: "meteor" },
// 	{ key: "node", text: "NodeJS", value: "node" },
// 	{ key: "plumbing", text: "Plumbing", value: "plumbing" },
// 	{ key: "python", text: "Python", value: "python" },
// 	{ key: "rails", text: "Rails", value: "rails" },
// 	{ key: "react", text: "React", value: "react" },
// 	{ key: "repair", text: "Kitchen Repair", value: "repair" },
// 	{ key: "ruby", text: "Ruby", value: "ruby" },
// 	{ key: "ui", text: "UI Design", value: "ui" },
// 	{ key: "ux", text: "User Experience", value: "ux" },
// ];

const ModuleSelector = () => {
	// <Dropdown placeholder='Select module' fluid multiple selection options={options} />
	return (

		<select placeholder='Select module'>
			{modules.map((module) => {
				<option>{module.name}</option>;
			})}
		</select>

	);
};



export default ModuleSelector;