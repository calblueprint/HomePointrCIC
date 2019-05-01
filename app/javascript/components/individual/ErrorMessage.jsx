import React from "react";
import PropTypes from "prop-types";
import { message, Button } from "antd";
import APIRoutes from "helpers/api_routes";
import "antd/dist/antd.css";

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return message.error(this.props.message);
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
