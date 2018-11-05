import React from "react";
import PropTypes from "prop-types";
import { Button, Intent } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import PropertyForm from "./PropertyForm";

class TextBox extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.text}</label>
        <input
          type="text"
        /> 
      </div>
    )
  }
}

TextBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export default TextBox