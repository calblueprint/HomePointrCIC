import React from "react";
import PropTypes from "prop-types";
import { Tag, Avatar, Row, Col, Button } from "antd";
import Utils from "helpers/utils";
import '../../../assets/stylesheets/tenantcard.css';
import '../../../assets/stylesheets/application.css';
import TenantModal from "../modals/TenantModal";

class TenantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: this.props.tenant,
      displayTag: this.props.displayTag,
      renderModal: this.props.renderModal,
      displayModal: false,
      renderEdit: 0,
      viewpoint: this.props.viewpoint,
      disableDivClick: false
    }
  }

  renderAvatar = () => {
    if (this.state.tenant.url == null) {
      return (
        <React.Fragment key='avatar'>
          <Avatar className="profile-picture" size={144} shape="square" icon="user"/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment key='avatar'>
          <Avatar size={144} shape="square" className="profile-picture" src={this.state.tenant.url}/>
        </React.Fragment>
      )
    }
  }

  // Three cases:
  // 1. If the modal is already being displayed or user is hovering on edit, do nothing
  // 2. If we want the modal to be rendered on click (aka within Property Show page), display it
  // 3. If user is a referral agency, redirect to Tenant Show page
  onTenantClick = () => {
    if (this.state.displayModal || this.state.disableDivClick) {
      return;
    } else if (this.state.renderModal) {
      this.setState({displayModal: true});
    } else {
      window.location='/tenants/' + this.state.tenant.id;
    }
  }

  // Function to close modal (to be passed in as a prop to TenantModal)
  onDismiss = () => {
    this.setState({displayModal: false})
  }

  // Handles rendering the modal if user is on Property Show page
  // Don't want to render the modal if hovering over edit button
  renderModalOnClick = () => {
    if (this.state.renderModal && !this.state.renderEdit) {
      return(
        <TenantModal
          tenant={this.state.tenant}
          visible={this.state.displayModal}
          onOk={this.onDismiss}
          onCancel={this.onDismiss}
          application={this.props.application}
          displayTag={this.props.displayTag}
        />
      );
    }
  }


  // Toggles whether edit button is hovered
  renderEdit = (event) => {
    if (this.state.viewpoint === "RA") {
      this.setState((state) => {
        return {renderEdit: 1 - state.renderEdit}
      });
    }
  }

  // If user is hovering over the edit button, we do not want the entire div to be clickable
  disableDivClick = (event) => {
    this.setState((state) => {
      return {disableDivClick: 1 - state.disableDivClick}
    });
  }

  handleEdit = () => {
    window.location = '/tenants/' + this.state.tenant.id.toString() + '/edit'
  }

  // Renders edit button on card hover
  editButtonHelper = () => {
    if (this.state.renderEdit) {
      return(
        <Button
          className='card-edit-button'
          key='button'
          type='default'
          onClick={this.handleEdit}
          onMouseEnter={this.disableDivClick}
          onMouseLeave={this.disableDivClick}>
          Edit
        </Button>
      );
    }
  }

  render() {
    return(
      <div
        onMouseEnter={this.renderEdit}
        onMouseLeave={this.renderEdit}
        onClick={this.onTenantClick}
        className="tenant-card"
      >
        <div className="avatar">{this.renderAvatar()}</div>
        <div className="content-container">
          <div className="header-container">
            <Col span={21}>
              <h2 className="title">{this.state.tenant.name}</h2>
              <div className="status-tag">
                {Utils.renderStatus(this.state.tenant.status, this.props.displayTag)}
              </div>
            </Col>
            <Col span={3}>
              {this.editButtonHelper()}
            </Col>
          </div>
          <div className="details-container">
            <Col span={24}>
              <h3>Email</h3>
              <p>{this.state.tenant.email}</p>
            </Col>
          </div>
        </div>
        {this.renderModalOnClick()}
      </div>
    );
  }
}

export default TenantCard;
