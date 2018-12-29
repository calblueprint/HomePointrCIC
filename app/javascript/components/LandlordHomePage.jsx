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
    this.setup();
    return [
      <h1>Properties</h1>,
      <Button 
        style={{
        width: "20%",
        margin: "1.5% auto",
        left: "80%",
        }}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewProperty}>+ New Property</Button>,
      <ListView resources={this.state.resources} type="property" avatar={true} checkbox={false}/>
    ];
  }
}

LandlordHomePage.propTypes = {
  resources: PropTypes.array,
  images: PropTypes.array,
  type: PropTypes.string
};
export default LandlordHomePage;
