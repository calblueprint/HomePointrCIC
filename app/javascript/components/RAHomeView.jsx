import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button } from 'antd';
import SplitViewContainer from "./individual/SplitViewContainer.jsx";

class RAHomeView extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      tenants: props.tenants,
      disabled: false //to prevent app pairing with no tenants
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

  checkDisable(leftComponent) {
    if (this.props.tenants.length == 0) {
      this.state.disabled = true;
      return(<center><h1>You must create a new client first!</h1></center>)
    } else {
      return(<ListView resources={this.state.tenants} type="tenant" avatar={true} tenant_modal={false}/>)
    }
  }

	render() {
    this.setup(this.state.tenants, this.props.tenantImages);
    let leftComponent = this.checkDisable(leftComponent);
    var disabled = this.state.disabled ? 'disabled' : ''
    const rightComponent = (
      <Button 
        style={{
        bottom: "-2%",
        width: "50%",
        left: "24%"
        }}
        disabled={disabled}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewApplications}>Match Clients With Available Properties</Button>
    );

		return ([<Button 
        style={{
        width: "20%",
        margin: "1.5% auto",
        left: "80%",
        }}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewTenant}>+ New Client</Button>,
			<SplitViewContainer
				leftComponent={leftComponent}
				rightComponent={rightComponent}
			/>]
		);
	}
}

RAHomeView.propTypes = {
  properties: PropTypes.array,
  tenants: PropTypes.array,
  tenantImages: PropTypes.array,
};

export default RAHomeView;
