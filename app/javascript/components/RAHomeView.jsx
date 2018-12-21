import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import SplitViewContainer from "./SplitViewContainer.jsx";

class RAHomeView extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      tenants: props.tenants
    }
	}

  setup(obj, images) {
    for (var i=0; i < images.length; i++) {
      obj[i] = Utils.extend(obj[i], images[i])
    }
  }

	render() {
    this.setup(this.state.tenants, this.props.tenantImages);
		const leftComponent = (
			<ListView resources={this.state.tenants} type="tenant" avatar={true}/>
		);
		const rightComponent = (
			<ListView resources={this.props.properties} type="property" property_modal={true}/>
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
