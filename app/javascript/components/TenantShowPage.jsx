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
    const leftComponent = (
      <RATenantView key={this.props.tenant.id} id={this.props.tenant.id} name={this.props.tenant.name} mode="ra_edit" description={this.props.tenant.description} avatar={this.props.url} tagValues={this.props.tagValues} status={this.props.status}/>
    );
    const rightComponent = ([
      <h1>Applications</h1>, 
      <ListView key={this.props.tenant.id} applications={this.state.applications} resources={this.props.properties} property_modal={true} type="property"/>
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
