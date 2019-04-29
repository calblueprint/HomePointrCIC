import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import SplitViewContainer from "./individual/SplitViewContainer.jsx";
import RATenantView from "./RATenantView.jsx";
import ListView from "./ListView.jsx";
import Utils from "helpers/utils";
import { Icon, Button, Tabs } from "antd";
import PropertyModal from "./modals/PropertyModal";
import "../../assets/stylesheets/splitscreenright.css";

class TenantShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: props.applications,
      properties: props.properties
    };
  }

  // Adds counts of current property residents and applications to
  // properties the tenant has applied to (for use in the PropertyCards)
  countSetupHelper = () => {
    for (var i = 0; i < this.state.properties.length; i++) {
      this.state.properties[i]["tenantCount"] = this.props.propertyTenantCounts[
        i
      ];
      this.state.properties[i][
        "potentialTenantCount"
      ] = this.props.propertyAppCounts[i];
    }
    this.handleRedirect = this.handleRedirect.bind(this);
  };

  handleRedirect() {
    window.location = "/applications/new/" + this.props.tenant.id.toString();
  }

  render() {
    Utils.setup(this.state.applications, this.props.form);
    Utils.setup(this.state.properties, this.props.propertyimages);
    Utils.setup(this.state.properties, this.props.propertyForms);
    Utils.setup(this.state.properties, this.props.propertyStatuses);
    this.countSetupHelper();
    const leftComponent = (
      <RATenantView
        key={this.props.tenant.id}
        tenant={this.props.tenant}
        mode="ra_edit"
        avatar={this.props.url}
        status={this.props.status}
        clientForm={this.props.clientForm}
        formName={this.props.formName}
      />
    );
    const rightComponent = (
      <div className="split-screen-tabs">
        <h1 className="h1-indent">Current Applications</h1>
        <Button type="primary" className="new-app-btn" onClick={this.handleRedirect}>
          + New Applications
        </Button>
        <ListView
          key={this.props.tenant.id}
          applications={this.state.applications}
          resources={this.state.properties}
          property_modal={true}
          type="property"
          displayTag={true}
          renderModal={true}
          viewpoint="RA"
        />
      </div>
    );

    return [
      <SplitViewContainer
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    ];
  }
}

TenantShowPage.propTypes = {
  status: PropTypes.number,
  applications: PropTypes.array,
  form: PropTypes.array,
  tenant: PropTypes.object,
  properties: PropTypes.array,
  tagValues: PropTypes.array,
  url: PropTypes.string
};
export default TenantShowPage;
