import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import PropertyView from "./individual/PropertyView.jsx";
import SplitViewContainer from "./individual/SplitViewContainer.jsx";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Icon, Button, Tabs } from "antd";

class PropertyShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenants: props.tenants,
      potentialTenants: props.potentialTenants,
      tenantApps: props.tenantApps,
      potentialTenantApps: props.potentialTenantApps,
    }
  }

  setup(obj, images) {
    for (var i=0; i < images.length; i++) {
      obj[i] = Utils.extend(obj[i], images[i])
    }
  }

  render() {
    this.setup(this.state.tenants, this.props.tenantImages);
    this.setup(this.state.potentialTenants, this.props.potentialTenantsImages);
    this.setup(this.state.tenantApps, this.props.tenantAppsPDF);
    this.setup(this.state.potentialTenantApps, this.props.potentialTenantAppsPDF);
    const TabPane = Tabs.TabPane;
    const leftComponent = (
      <PropertyView canceledit={false} property={this.props.property}/>
    );
    const rightComponent = (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Your Clients" key="1"><ListView tenant_modal={true} property_id={this.props.property.id} applications={this.props.tenantApps} resources={this.state.tenants} type="tenant" housed={true} avatar={true} checkbox={false}/></TabPane>
      <TabPane tab="Pending Applications" key="2"><ListView tenant_modal={true} property_id={this.props.property.id} applications={this.props.potentialTenantApps} resources={this.state.potentialTenants} type="tenant" housed={false} avatar={true} checkbox={false}/></TabPane>
    </Tabs>);

    return (
      [
      <Button type="default" href={"/properties/"}>
        <Icon type="left" /> View All Properties
      </Button>,
      <SplitViewContainer
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
      ]
    );
  }
}

PropertyShowPage.propTypes = {
  name: PropTypes.string,
  mode: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
  images: PropTypes.array,
  tenants: PropTypes.array,
  tenantImages: PropTypes.array,
  potentialTenants: PropTypes.array,
  potentialTenantsImages: PropTypes.array,
  tenantApps: PropTypes.array,
  potentialTenantApps: PropTypes.array,
  tenantAppsPDF: PropTypes.array,
  potentialTenantAppsPDF: PropTypes.array,
};
export default PropertyShowPage;
