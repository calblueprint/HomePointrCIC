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

  setup() {
    for (var i=0; i < this.props.images.length; i++) {
      this.state.resources[i] = Utils.extend(this.state.resources[i], this.props.images[i])
    }

    for (var i = 0; i < this.state.resources.length; i ++) {
      this.state.resources[i]["tenantCount"] = this.props.tenantCounts[i]
      this.state.resources[i]["potentialTenantCount"] = this.props.potentialTenantCounts[i]
    }
  }

  renderView() {
    if (this.state.resources.length === 0) {
      return(
        <Avatar shape="square" src="/assets/leaves.png" size={350}/>
      )
    } else {
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
    }
  }

  render() {
    this.setup();
    return (
      <div className="dashboard-container">
        <div className="dash-items-container">
          <h2 className="dashboard-h2">Properties</h2>
          {this.renderView()}
        </div>
        <div className="dash-button-container">
          <Button
            className="add-new-button"
            key="submit"
            type="primary"
            onClick={this.redirectToNewTenant}>+ Add new property
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
