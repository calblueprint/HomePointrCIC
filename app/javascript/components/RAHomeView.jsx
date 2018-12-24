import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button } from 'antd';
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

  redirectToNewTenant() {
    window.location = '/tenants/new'
  }

  redirectToNewApplications() {
    window.location = '/applications/new'
  }

	render() {
    this.setup(this.state.tenants, this.props.tenantImages);
		const leftComponent = (
			<ListView resources={this.state.tenants} type="tenant" avatar={true} tenant_modal={false}/>
		);
    const rightComponent = (
      <Button 
        style={{
        bottom: "-2%",
        width: "50%",
        left: "24%"
        }}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewApplications}>Match Tenants With Available Properties</Button>
    );

		return ([<Button 
        style={{
        width: "20%",
        margin: "1.5% auto",
        left: "80%",
        }}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewTenant}>+ New Tenant</Button>,
			<SplitViewContainer
				leftComponent={leftComponent}
				rightComponent={rightComponent}
			/>]
		);
	}
}

export default RAHomeView;
