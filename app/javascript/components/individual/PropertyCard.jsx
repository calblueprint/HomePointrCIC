import React from "react";
import PropTypes from "prop-types";
import { Tag, Avatar, Row, Col, Button } from "antd";
import Utils from "helpers/utils";
import '../../../assets/stylesheets/tenantcard.css';
import '../../../assets/stylesheets/application.css';
import PropertyModal from "../modals/PropertyModal";

class PropertyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTag: this.props.displayTag,
      renderModal: this.props.renderModal,
      displayModal: false,
      renderEdit: 0,
      viewpoint: this.props.viewpoint,
      disableDivClick: false
    }
  }

  renderAvatar = () => {
    if (this.props.property.images) {
      return(
        <img className="img" height="144" width="144" src={this.props.property.images[0].url} />
      );
    } else {
      return(
        <Avatar size={144} shape="square" icon="home" />
      );
    }
  }

  // Three cases:
  // 1. If the modal is already being displayed or user is hovering on edit, do nothing
  // 2. If we want the modal to be rendered on click (aka within Tenant Show Page), display it
  // 3. If user is a landlord, redirect to Property Show page
  onPropertyClick = () => {
    if (this.state.displayModal || this.state.disableDivClick || this.props.noClick) {
      return;
    } else if (this.state.renderModal) {
      this.setState({displayModal: true});
    } else {
      window.location='/properties/' + this.props.property.id;
    }
  }

  // Function to close modal (to be passed in as a prop to PropertyModal)
  onDismiss = () => {
    this.setState({displayModal: false})
  }

  // Handles rendering the modal if user is on Tenant Show Page
  // Don't want to render the modal if hovering over edit button
  renderModalOnClick = () => {
    if (this.state.renderModal && !this.state.renderEdit) {
      return(
        <PropertyModal
          property={this.props.property}
          visible={this.state.displayModal}
          onOk={this.onDismiss}
          onCancel={this.onDismiss}
        />
      );
    }
  }

  // Toggles whether edit button is hovered
  renderEdit = (event) => {
    if (this.state.viewpoint === "LL") {
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
    window.location = '/properties/' + this.props.property.id.toString() + '/edit'
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
          onMouseLeave={this.disableDivClick}
        >Edit</Button>
      );
    }
  }

  // If we want the status to be shown, aka the property has a status, render the tag
  renderStatus = () => {
    if (this.props.property.status) {
      return(
        Utils.renderStatus(this.props.property.status, this.state.displayTag)
      );
    }
  }

  render() {
    return(
      <div
        onMouseEnter={this.renderEdit}
        onMouseLeave={this.renderEdit}
        onClick={this.onPropertyClick}
        className="tenant-card"
      >
        <div className="avatar">{this.renderAvatar()}</div>
        <div className="content-container">
          <div className="header-container">
            <Col span={21}>
              <h2 className="property-title">{this.props.property.address.split(",")[0]}</h2>
              <div className="status-tag">
                {this.renderStatus()}
              </div>
            </Col>
            <Col span={3}>
              {this.editButtonHelper()}
            </Col>
          </div>
          <div className="details-container">
            <Col span={7}>
              <h3>Location</h3>
              <p>{Utils.titleize(this.props.property.location)}</p>
            </Col>
            <Col span={6}>
              <h3>Current</h3>
              <p>{this.props.property.tenantCount}</p>
            </Col>
            <Col span={6}>
              <h3>Apps</h3>
              <p>{this.props.property.potentialTenantCount}</p>
            </Col>
            <Col span={5}>
              <h3>Openings</h3>
              <p>{this.props.property.capacity - this.props.property.tenantCount}</p>
            </Col>
          </div>
        </div>
        {this.renderModalOnClick()}
      </div>
    );


  }

}

export default PropertyCard;
