import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import SplitViewContainer from "./SplitViewContainer.jsx";

class RAHomeView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const leftComponent = (
			<ListView resources={this.props.tenants} type="tenant" />
		);
		const rightComponent = (
			<ListView resources={this.props.properties} type="property" />
		);

		return (
			<SplitViewContainer
				leftComponent={leftComponent}
				rightComponent={rightComponent}
			/>
		);
	}
}

export default RAHomeView;
