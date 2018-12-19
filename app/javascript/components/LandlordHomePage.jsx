import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import { Button } from "antd";

class LandlordHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  redirectToNewProperty() {
    window.location = '/properties/new'
  }

  render() {
    return [
      <Button 
        style={{
        width: "20%",
        margin: "1.5% auto",
        right: "-1000px",
        }}
        key='submit' 
        type="primary" 
        onClick={this.redirectToNewProperty}>+ New Property</Button>,
      <ListView resources={this.props.resources} type="property" />
    ];
  }
}

LandlordHomePage.propTypes = {
  resources: PropTypes.array
};
export default LandlordHomePage;
