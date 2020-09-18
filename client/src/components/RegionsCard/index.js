import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import PropTypes from "prop-types";


const RegionsCard = ({ region }) => {
	return (
		<Link
			className="regions-card"
			to={{ pathname:`regions/${region.name}/students` }}
		>
			<div className="card-container">
				<p className="region-name">{region.name}</p>
				<div className="image-container">
					<img className="region-image" src={region.image_url} alt={region.name + "'s image"} />
				</div>
			</div>
		</Link>
	);
};

RegionsCard.propTypes = {
	region: PropTypes.object.isRequired,
};

export default RegionsCard;