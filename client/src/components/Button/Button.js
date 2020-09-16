import React from "react";
import PropTypes from "prop-types";

const Button = ({ content, handleClick }) => {
	return (
		<button className={ content.toLowerCase() + "-button" }
			onClick={handleClick}>{content}</button>
	);
};

Button.propTypes = {
	content: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default Button;
