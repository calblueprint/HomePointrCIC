import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button, Avatar } from "antd";

class LLDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: props.resources
    }
  }

  redirectToNewProperty() {
    window.location = '/properties/new'
  }

  // First loop: adds images to each property
  // Second loops: adds current tenant and application counts to each property
  setup() {
    for (var i=0; i < this.props.images.length; i++) {
      this.state.resources[i] = Utils.extend(this.state.resources[i], this.props.images[i])
    }

    for (var i = 0; i < this.state.resources.length; i ++) {
      this.state.resources[i]["tenantCount"] = this.props.tenantCounts[i]
      this.state.resources[i]["potentialTenantCount"] = this.props.potentialTenantCounts[i]
    }
  }

  renderProperties() {
    if (this.state.resources.length !== 0) {
      return(
        <ListView
          resources={this.state.resources}
          type="property"
          avatar={true}
          checkbox={false}
          displayTag={true}
          renderModal={false}
          viewpoint="LL"
        />  
      )
    } else {
      return(
        <div>
          <img src={'/assets/noProperties.png'} className="empty-dashboard-img"/>
          <div className="empty-dashboard-text">
            <div className="empty-dashboard-header">
              <h2>No properties yet</h2>
            </div>
            <div className="empty-dashboard-description">
              <h3>Click on 'Add new property' to get started.</h3>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    this.setup();
    return (
      <div className="dashboard-container">
        <div className="dash-items-container">
          <h2 className="dashboard-h2">Properties</h2>
          {this.renderProperties()}
        </div>
        <div className="dash-button-container">
          <Button
            className="add-new-button"
            key="submit"
            type="primary"
            onClick={this.redirectToNewProperty}>+ Add new property
          </Button>
        </div>
      </div>
    );
  }
}

LLDashboard.propTypes = {
  resources: PropTypes.array,
  images: PropTypes.array,
  type: PropTypes.string
};
export default LLDashboard;
