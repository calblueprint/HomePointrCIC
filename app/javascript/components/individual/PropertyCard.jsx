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
      property: this.props.property,
      displayTag: this.props.displayTag,
      renderModal: this.props.renderModal,
      displayModal: false,
      renderEdit: 0,
      viewpoint: this.props.viewpoint,
      disableDivClick: false
    }
  }

  renderAvatar = () => {
    if (this.state.property.images) {
      return(
        <img className="img" height="144" width="144" src={this.state.property.images[0].url} />
      );
    } else {
      return(
        <Avatar size={144} shape="square" icon="home" />
      );
    }
  }

  onDismiss = () => {
    this.setState({displayModal: false})
  }

  // needs to change depending on whether we want to redirect or render modal
  onPropertyClick = () => {
    if (this.state.displayModal || this.state.disableDivClick) {
      return;
    } else if (this.state.renderModal) {
      this.setState({displayModal: true});
    } else {
      window.location='/properties/' + this.state.property.id;
    }
  }

  renderModalOnClick = () => {
    if (this.state.renderModal && !this.state.renderEdit) {
      return(
        <PropertyModal
          property={this.state.property}
          visible={this.state.displayModal}
          onOk={this.onDismiss}
          onCancel={this.onDismiss}
        />
      );
    }
  }

  handleEdit = () => {
    window.location = '/properties/' + this.state.property.id.toString() + '/edit'
  }

  renderEdit = (event) => {
    if (this.state.viewpoint === "LL") {
      this.setState((state) => {
        return {renderEdit: 1 - state.renderEdit}
      });
    }
  }

  disableDivClick = (event) => {
    this.setState((state) => {
      return {disableDivClick: 1 - state.disableDivClick}
    });
  }

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

  renderStatus = () => {
    if (this.state.property.status) {
      return(
        Utils.renderStatus(this.state.property.status, this.state.displayTag, true)
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
              <h2 className="title">Eventual Name</h2>
              <div className="status-tag">
                {this.renderStatus()}
              </div>
            </Col>
            <Col span={3}>
              {this.editButtonHelper()}
            </Col>
          </div>
          <div className="details-container">
            <Col span={6}>
              <h3>Location</h3>
              <p>{this.state.property.location}</p>
            </Col>
            <Col span={6}>
              <h3>Current</h3>
              <p>{this.state.property.tenantCount}</p>
            </Col>
            <Col span={6}>
              <h3>Apps</h3>
              <p>{this.state.property.potentialTenantCount}</p>
            </Col>
            <Col span={6}>
              <h3>Openings</h3>
              <p>{this.state.property.capacity - this.state.property.tenantCount}</p>
            </Col>
          </div>
        </div>
        {this.renderModalOnClick()}
      </div>
    );


  }

}

export default PropertyCard;
