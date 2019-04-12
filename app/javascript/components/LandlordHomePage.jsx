import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button, Avatar } from "antd";

class LandlordHomePage extends React.Component {
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
      console.log(this.state.resources[i])

      this.state.resources[i]["tenantCount"] = this.props.tenantCounts[i]
      this.state.resources[i]["potentialTenantCount"] = this.props.potentialTenantCounts[i]

      console.log(this.state.resources[i])
    }
  }

  renderView() {
    if (this.state.resources.length === 0) {
      return(<Avatar shape="square" src="/assets/leaves.png" size={350}/>)
    } else {
      return(
        <ListView
          resources={this.state.resources}
          type="property"
          avatar={true}
          checkbox={false}
          viewpoint="LL"/>)
    }
  }

  render() {
    this.setup();
    return [
      <div className="LLHome"><h1>Properties</h1></div>,
      <Button
        style={{
        width: "20%",
        margin: "1.5% auto",
        left: "80%",
        }}
        key='submit'
        type="primary"
        onClick={this.redirectToNewProperty}>+ New Property</Button>,
      this.renderView()
    ];
  }
}

LandlordHomePage.propTypes = {
  resources: PropTypes.array,
  images: PropTypes.array,
  type: PropTypes.string
};
export default LandlordHomePage;
