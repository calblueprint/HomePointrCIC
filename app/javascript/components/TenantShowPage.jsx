import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import SplitViewContainer from "./individual/SplitViewContainer.jsx";
import RATenantView from "./RATenantView.jsx";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Icon, Button, Tabs } from "antd";

class TenantShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: props.applications,
      properties: props.properties,
      // potentialTenants: props.potentialTenants
    }
  }

  setup(obj, images) {
    for (var i=0; i < images.length; i++) {
      obj[i] = Utils.extend(obj[i], images[i])
    }
  }

  render() {
    this.setup(this.state.applications, this.props.form);
    this.setup(this.state.properties, this.props.propertyimages);
    this.setup(this.state.properties, this.props.propertyForms);
    const leftComponent = (
      <RATenantView key={this.props.tenant.id} tenant={this.props.tenant} mode="ra_edit" avatar={this.props.url} status={this.props.status}/>
    );
    const rightComponent = ([
      <h1>Applications</h1>,
      <ListView key={this.props.tenant.id} applications={this.state.applications} resources={this.state.properties} property_modal={true} type="property"/>
    ]);

    return (
      [
      <Button type="default" href={"/"}>
        <Icon type="left" /> Back
      </Button>,
      <SplitViewContainer
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
      ]
    );
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
