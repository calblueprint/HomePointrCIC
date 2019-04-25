import React from "react";
import PropTypes from "prop-types";

const SplitViewContainer = props => (
  <div
    key="splitViewContainer" style={{
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      height: "90%",
      paddingTop: "64px",
      top: "0px"
    }}
  >
    <div key="left"
      style={{
        width: "480px",
        height: "100vh",
        display: "inline-block",
        overflow: "scroll",
        borderLeft: "1px solid gray",
      }}
    >
      {props.leftComponent}
    </div>

		<div key="right"
			style={{
				width: "960px",
				height: "100vh",
				display: "inline-block",
				overflow: "scroll",
				paddingLeft: "10px",
				borderLeft: "1px solid #E8E8E8"
			}}
		>
			{props.rightComponent}
		</div>
	</div>
);

export default SplitViewContainer;
