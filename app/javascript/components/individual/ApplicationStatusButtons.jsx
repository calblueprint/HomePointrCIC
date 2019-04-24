import React from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import ConfirmModal from '../modals/ConfirmModal'

class ApplicationStatusButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayRejectModal: 0,
      displayInterviewModal: 0,
      displayAcceptModal: 0,
      displayRemoveModal: 0
    };
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

  toggleConfirmationModal = (operation) => {
    if (operation === "Reject") {
      this.setState((state) => {
        return {displayRejectModal: 1 - state.displayRejectModal}
      });
    } else if (operation === "Interview") {
      this.setState((state) => {
        return {displayInterviewModal: 1 - state.displayInterviewModal}
      });
    } else if (operation === "Accept") {
      this.setState((state) => {
        return {displayAcceptModal: 1 - state.displayAcceptModal}
      });
    } else if (operation === "Remove") {
      this.setState((state) => {
        return {displayRemoveModal: 1 - state.displayRemoveModal}
      });
    }
  }

  renderConfirmationModal = (operation) => {
    if (operation === "Reject") {
      return(
        <ConfirmModal
          message={"reject this client"}
          operation={"Reject"}
          onOk={this.handleReject}
          onCancel={() => this.toggleConfirmationModal("Reject")}
          visible={this.state.displayRejectModal}
        />
      )
    } else if (operation === "Interview") {
      return(
        <ConfirmModal
          message={"interview this client"}
          operation={"Interview"}
          onOk={this.handleInterview}
          onCancel={() => this.toggleConfirmationModal("Interview")}
          visible={this.state.displayInterviewModal}
        />
      )
    } else if (operation === "Accept") {
      return(
        <ConfirmModal
          message={"offer this client tenancy"}
          operation={"Offer Tenancy"}
          onOk={this.handleAccept}
          onCancel={() => this.toggleConfirmationModal("Accept")}
          visible={this.state.displayAcceptModal}
        />
      )
    } else if (operation === "Remove") {
      return(
        <ConfirmModal
          message={"remove this client"}
          operation={"Remove Client"}
          onOk={this.removeTenant}
          onCancel={() => this.toggleConfirmationModal("Remove")}
          visible={this.state.displayRemoveModal}
        />
      )
    }
  }



  render() {
    if (this.props.status === "received") {
      return(
        <div className="app-buttons">
          <div className="reject-button">
            <Button
              key="reject"
              type="danger"
              onClick={() => this.toggleConfirmationModal("Reject")}>
              Reject
            </Button>
          </div>
          <div className="interview-button">
            <Button
              key="interview"
              type="default"
              onClick={() => this.toggleConfirmationModal("Interview")}>
              Interview
            </Button>
          </div>
          {this.renderConfirmationModal("Reject")}
          {this.renderConfirmationModal("Interview")}
        </div>
      );
    } else if (this.props.status === "interview") {
      return(
        <div className="app-buttons">
          <div className="reject-button">
            <Button
              key="reject"
              type="danger"
              onClick={() => this.toggleConfirmationModal("Reject")}>
              Reject
            </Button>
          </div>
          <div className="accept-button">
            <Button
              key="accept"
              type="primary"
              onClick={() => this.toggleConfirmationModal("Accept")}>
              Offer Tenancy
            </Button>
          </div>
          {this.renderConfirmationModal("Reject")}
          {this.renderConfirmationModal("Accept")}
        </div>
      );
    } else if (this.props.status === "housed") {
      return(
        <div className="app-buttons">
          <div className="remove-button">
            <Button
              key="remove"
              type="danger"
              onClick={() => this.toggleConfirmationModal("Remove")}>
              Remove Client
            </Button>
          </div>
          {this.renderConfirmationModal("Remove")}
        </div>
      );
    }
  }
}

ApplicationStatusButtons.propTypes = {
  application_id: PropTypes.number,
  property_id: PropTypes.number,
  status: PropTypes.string,
};

export default ApplicationStatusButtons
