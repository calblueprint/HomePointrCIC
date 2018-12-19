import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import PropertyView from "./PropertyView.jsx";
import SplitViewContainer from "./SplitViewContainer.jsx";
import { Button } from "antd";

class PropertyShowPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const leftComponent = (
      <PropertyView id={this.props.id} name={this.props.name} mode={this.props.mode} description={this.props.description} tagValues={this.props.tagValues} images={this.props.images}/>
    );
    const rightComponent = null;

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
