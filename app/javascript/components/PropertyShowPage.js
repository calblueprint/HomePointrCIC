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
      property: props.property,
      tenants: props.tenants,
      potentialTenants: props.potentialTenants,
      tenantApps: props.tenantApps,
      potentialTenantApps: props.potentialTenantApps,
    }
  }

  render() {
    Utils.setup([this.state.property], this.props.images);
    Utils.setup(this.state.tenants, this.props.tenantImages);
    Utils.setup(this.state.potentialTenants, this.props.potentialTenantsImages);
    Utils.setup(this.state.tenantApps, this.props.tenantAppsPDF);
    Utils.setup(this.state.potentialTenantApps, this.props.potentialTenantAppsPDF);
    Utils.setup(this.state.potentialTenants, this.props.potentialTenantStatuses);
    const TabPane = Tabs.TabPane;
    const leftComponent = (
      <PropertyView canceledit={false} property={this.state.property}/>
    );
    const rightComponent = (
      <div className="tab">
        <Tabs defaultActiveKey="1" style={{marginLeft: "50px"}}>
          <TabPane tab="Pending Applications" key="1">
            <ListView
              tenant_modal={true}
              property_id={this.props.property.id}
              applications={this.props.potentialTenantApps}
              resources={this.state.potentialTenants}
              type="tenant"
              housed={false}
              avatar={true}
              checkbox={false}
              displayTag={true}
              renderModal={true}
            />
          </TabPane>
          <TabPane tab="Your Clients" key="2">
            <ListView
              tenant_modal={true}
              property_id={this.props.property.id}
              applications={this.props.tenantApps}
              resources={this.state.tenants}
              type="tenant"
              housed={true}
              avatar={true}
              checkbox={false}
              displayTag={false}
              renderModal={true}
            />
          </TabPane>
        </Tabs>
      </div>
    );

    return (
      <div>
        <div className="">
          <Button type="default" href={"/properties/"}>
            <Icon type="left" /> View All Properties
          </Button>
        </div>
        <div>
          <SplitViewContainer
            leftComponent={leftComponent}
            rightComponent={rightComponent}
          />
        </div>
      </div>
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
