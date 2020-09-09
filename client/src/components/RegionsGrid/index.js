import React from "react";
import RegionsCard from "../RegionsCard/index.js";
import "./styles.css";
import "./grid.css";
import regions from "../../db/regions.json";
import Navbar from "../Navbar/index.js";

const RegionsGrid = ( ) => {

	return  (
		<>
			<Navbar />
			<div className="container">
				<div className="row">
					{ regions && regions.map((region, index) => (
						<RegionsCard region={region} key={index} className="col-12" />
					))}
				</div>
			</div>
		</>

	);

};

export default RegionsGrid;