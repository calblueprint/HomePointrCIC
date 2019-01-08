import React from "react";
import PropTypes from "prop-types";

const SplitViewContainer = props => (
	<div
		key="splitViewContainer" style={{
			display: "flex",
			justifyContent: "space-around",
			flexDirection: "row",
			height: "90%"
		}}
	>
		<div key="left"
			style={{
				width: "50%"
			}}
		>
			{props.leftComponent}
		</div>

		<div key="right"
			style={{
				width: "50%"
			}}
		>
			{props.rightComponent}
		</div>
	</div>
);

SplitViewContainer.propTypes = {
	leftComponent: PropTypes.element,
	rightComponent: PropTypes.element
};

export default SplitViewContainer;
