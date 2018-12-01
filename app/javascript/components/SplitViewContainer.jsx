import React from "react";
import PropTypes from "prop-types";


const SplitViewContainer = (props) => (
	<div
		style={{
			display: "flex", 
			"justifyContent": "space-around",
			"flexDirection": "row",
			"height": "90%"
		}}
	>
	<div
		style={{
			width: "50%"
		}}
	> {props.leftComponent}
	</div>

	<div
		style={{
			width: "50%"
		}}
	>{props.rightComponent}
	</div>

		</div>
	
);

SplitViewContainer.propTypes = {
	leftComponent: PropTypes.element,
	rightComponent: PropTypes.element
}

export default SplitViewContainer;