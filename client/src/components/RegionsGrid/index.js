import React from "react";
import RegionsCard from "../RegionsCard/index.js";
import "./styles.css";
import "./grid.css";
import regions from "../../db/regions.json";

const RegionsGrid = ( ) => {

	return  (
		<>
			<div>
				<div className="container regions-grids-container">
					<div className="row">
						{ regions && regions.map((region, index) => (
							<RegionsCard region={region} key={index} />
						))}
					</div>
				</div>
			</div>
		</>

	);

};

export default RegionsGrid;