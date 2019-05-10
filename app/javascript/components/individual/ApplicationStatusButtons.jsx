import React from "react";
import PropTypes from "prop-types";
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import ConfirmModal from '../modals/ConfirmModal'
import DeleteModal from '../modals/DeleteModal'

class ApplicationStatusButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayRejectModal: 0,
      displayInterviewModal: 0,
      displayOfferTenancyModal: 0,
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
  handleOfferTenancy = () => this.handleStatus("offer_of_tenancy");
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
    } else if (operation === "Offer Tenancy") {
      this.setState((state) => {
        return {displayOfferTenancyModal: 1 - state.displayOfferTenancyModal}
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
        <DeleteModal
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
    } else if (operation === "Offer Tenancy") {
      return(
        <ConfirmModal
          message={"offer this client tenancy"}
          operation={"Offer Tenancy"}
          onOk={this.handleOfferTenancy}
          onCancel={() => this.toggleConfirmationModal("Offer Tenancy")}
          visible={this.state.displayOfferTenancyModal}
        />
      )
    } else if (operation === "Remove") {
      return(
        <DeleteModal
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
          <div className="offer-tenancy-button">
            <Button
              key="offer_of_tenancy"
              type="primary"
              onClick={() => this.toggleConfirmationModal("Offer Tenancy")}>
              Offer Tenancy
            </Button>
          </div>
          {this.renderConfirmationModal("Reject")}
          {this.renderConfirmationModal("Offer Tenancy")}
        </div>
      );
    } else if (this.props.status == "offer_of_tenancy") {
      return (
        <div style={{ float: "right" }}>
          <Alert className="offer-tenancy-warning" message="Waiting for Referral Agency Respone to Offer of Tenancy" type="warning" style={{ width: 420, marginRight: 65 }}/>
          <div className="app-buttons">
            <div className="reject-button">
              <Button
                key="reject"
                type="danger"
                onClick={() => this.toggleConfirmationModal("Reject")}>
                Reject
              </Button>
            </div>
            {this.renderConfirmationModal("Reject")}
          </div>
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
