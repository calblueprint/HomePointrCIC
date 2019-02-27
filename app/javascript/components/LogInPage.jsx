import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Utils from 'helpers/utils';
import { Button, Avatar } from "antd";

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '';
      password: '';
    }
  }
}

export default LogInPage;
