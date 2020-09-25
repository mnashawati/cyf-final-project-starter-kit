import React from "react";
import backArrow from "../../assets/image-two.png";
import PropTypes from "prop-types";

const Navigation = ({ history, title }) => {
	console.log("title", title);
	return (
		<button
			onClick={() => history.goBack()}
			type='button'
			className='btn btn-outline-secondary go-back-btn'
		>
			<img
				src={backArrow}
				alt='back-arrow'
				className='back-arrow-icon'
			/>
        		{title}
		</button>

	);
};

export default Navigation;

Navigation.propTypes = {
	history: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
};