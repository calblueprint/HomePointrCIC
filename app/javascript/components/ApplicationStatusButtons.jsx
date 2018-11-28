import React from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import ProfileForm from "./ProfileForm";

class ApplicationStatusButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleInterview = this.handleInterview.bind(this);
    this.handleReject = this.handleReject.bind(this)
  }

  handleAccept() {

  }

  handleInterview() {

  }

  handleReject() {

  }
//     0 - matched with a house
//     1 - interviewing with a house
//     2 - applied
//     3 - rejected
//     4 - not applied yet
  render() {
    if (this.state.status === 0) {
      return [<Button type="danger">Remove Tenant</Button>]
    } else if (this.state.status === 1) {
      return [<Button type="danger">Reject</Button>,
              <Button type="default">Interview</Button>,
              <Button type="primary" >Accept</Button>]
    } else if (this.state.status >= 2 && this.state.status <= 4) {
      return [<Button type="danger">Reject</Button>,
              <Button type="default">Interview</Button>,
              <Button type="primary" disabled>Accept</Button>]
    } else {
      return null
    }
  }
}

ApplicationStatusButtons.propTypes = {
  t_id: PropTypes.number,
  a_id: PropTypes.number,
  status: PropTypes.number
};

export default ApplicationStatusButtons