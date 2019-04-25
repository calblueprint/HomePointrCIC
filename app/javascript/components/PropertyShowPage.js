import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import PropertyView from "./individual/PropertyView.jsx";
import SplitViewContainer from "./individual/SplitViewContainer.jsx";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Icon, Button, Tabs } from "antd";
import '../../assets/stylesheets/splitscreenright.css';

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
    Utils.setup([this.state.property], [this.props.propertyFormPDF]);

    const TabPane = Tabs.TabPane;
    const leftComponent = (
      <PropertyView canceledit={false} property={this.state.property} numTenants={this.props.numTenants}/>
    );
    const rightComponent = (
      <div className="split-screen-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Pending Applications" key="1">
            <div className="tab-cards">
              <ListView
                applications={this.props.potentialTenantApps}
                resources={this.state.potentialTenants}
                type="tenant"
                avatar={true}
                checkbox={false}
                displayTag={true}
                renderModal={true}
                viewpoint="LL"
              />
            </div>
          </TabPane>
          <TabPane tab="Your Clients" key="2">
            <div className="tab-cards">
              <ListView
                applications={this.props.tenantApps}
                resources={this.state.tenants}
                type="tenant"
                avatar={true}
                checkbox={false}
                displayTag={false}
                renderModal={true}
                viewpoint="LL"
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );

    return (
      <div>
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
