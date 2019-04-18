import React from "react";
import PropTypes from "prop-types";
import FilterPanel from "./FilterPanel.jsx";
import ListView from "./../ListView.jsx";
import { Button } from 'antd';
import moment from 'moment';

class ApplicationSubmissionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProperties: props.selectedProperties
    }
  }

  render() {
    return (
      <div key="ApplicationSubmissionWrapper"
        style={{
          paddingTop: "5%",
        }}
      >
        <ListView avatar={true} resources={this.props.selectedProperties} tenant={this.props.tenant} renderModal={true} type="property" checkbox={false} submission_modal={true} CheckboxChange={this.props.CheckboxChange}/>
      </div>
    );
  }
}

ApplicationSubmissionWrapper.propTypes = {
  properties: PropTypes.array,
  selectedTenant: PropTypes.object,
};

export default ApplicationSubmissionWrapper;
