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
				width: "31%",
				height: "100vh",
				overflow: "scroll",
				borderLeft: "1px solid gray"
			}}
		>
			{props.leftComponent}
		</div>

		<div key="right"
			style={{
				width: "64%",
				height: "100vh",
				overflow: "scroll",
				paddingLeft: "10px",
				borderLeft: "1px solid gray"
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
