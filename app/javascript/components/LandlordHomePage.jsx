import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button } from "antd";

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
  }

  render() {
    return [
      this.setup(),
      <h1>Properties</h1>,
      <Button 
        style={{
        width: "20%",
        margin: "1.5% auto",
        right: "-1000px",
        }}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewProperty}>+ New Property</Button>,
      <ListView resources={this.state.resources} type="property" avatar={true} checkbox={false}/>
    ];
  }
}

LandlordHomePage.propTypes = {
  resources: PropTypes.array
};
export default LandlordHomePage;
