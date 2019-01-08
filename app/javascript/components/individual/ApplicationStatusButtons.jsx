import React from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';

class ApplicationStatusButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleStatus = this.handleStatus.bind(this);
  }

  handleStatus(new_status) {
    let application_id = this.props.application_id;
    let body = JSON.stringify({status: new_status});
    let request =APIRoutes.applications.update(application_id)
    fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      window.location = '/properties/' + this.props.property_id
    }).catch((data) => {
      console.error(data);
    });
  }

  handleReject = () => this.handleStatus("rejected");
  handleInterview = () => this.handleStatus("interview");
  handleAccept = () => this.handleStatus("housed");
  removeTenant = () => this.handleStatus("rejected");

// rejected: 0, received: 1, interview: 2, housed: 3

  render() {
    if (this.props.status === "received") {
      return [<Button key="reject" type="danger" onClick={this.handleReject}>Reject</Button>,
              <Button key="interview" type="default" onClick={this.handleInterview}>Interview</Button>,
              <Button key="accept" type="primary" disabled>Accept</Button>]
    } else if (this.props.status === "interview") {
      return [<Button key="reject" type="danger" onClick={this.handleReject}>Reject</Button>,
              <Button key="interview" type="default" disabled>Interview</Button>,
              <Button key="accept" type="primary" onClick={this.handleAccept}>Accept</Button>]
    } else if (this.props.status === "housed") {
      return <Button key="remove" type="danger" onClick={this.removeTenant}>Remove Tenant</Button>
    } else {
      return null
    }
  }
}

ApplicationStatusButtons.propTypes = {
  application_id: PropTypes.number,
  property_id: PropTypes.number,
  status: PropTypes.string,
};

export default ApplicationStatusButtons