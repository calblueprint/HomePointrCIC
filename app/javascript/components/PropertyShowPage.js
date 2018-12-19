import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import PropertyView from "./PropertyView.jsx";
import SplitViewContainer from "./SplitViewContainer.jsx";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button, Tabs } from "antd";

class PropertyShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenants: props.tenants,
      potentialTenants: props.potentialTenants
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
    const TabPane = Tabs.TabPane;
    const leftComponent = (
      <PropertyView id={this.props.id} name={this.props.name} mode={this.props.mode} description={this.props.description} tagValues={this.props.tagValues} images={this.props.images}/>
    );
    const rightComponent = (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Your Tenants" key="1"><ListView resources={this.state.tenants} type="tenant" housed={true} avatar={true} checkbox={false}/></TabPane>
      <TabPane tab="Pending Applications" key="2"><ListView resources={this.state.potentialTenants} type="tenant" housed={false} avatar={true} checkbox={false}/></TabPane>
    </Tabs>);

    return (
      <SplitViewContainer
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    );
  }
}

PropertyShowPage.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  mode: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
};
export default PropertyShowPage;
