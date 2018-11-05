import React from "react";
import PropTypes from "prop-types";
import { Button, Intent } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import PropertyForm from "./PropertyForm";

class DropdownSelect extends React.Component {
  // getInitialState() {
  //   return {selectValue:'Radish'};
  // }

  // handleChange(e) {
  //   this.setState({selectValue:e.target.value});
  // }

  // value={this.state.selectValue}
  // onChange={this.handleChange}

  render() {
    return (
      <div>
        <label>{this.props.text}</label>
        <Select
          items={this.props.selections}
        >
        </Select>
      </div>  
    )
  }
}

DropdownSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export default DropdownSelect
