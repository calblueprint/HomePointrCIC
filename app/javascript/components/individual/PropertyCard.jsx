import React from "react";
import PropTypes from "prop-types";
import { Tag, Avatar, Row, Col } from "antd";
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
      displayModal: false
    }
  }

  renderAvatar = () => {
    console.log(this.state.property)
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
    if (this.state.displayModal) {
      return;
    } else if (this.state.renderModal) {
      this.setState({displayModal: true});
    } else {
      window.location='/properties/' + this.state.property.id;
    }
  }

  renderModalOnClick = () => {
    if (this.state.renderModal) {
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

  render() {
    return(
      <div onClick={this.onPropertyClick} className="tenant-card">
        <div className="avatar">{this.renderAvatar()}</div>
        <div className="content-container">
          <Row className="header-container">
            <Col span={20}>
              <h2 className="title">Eventual Name</h2>
              <div className="status-tag">
                {Utils.renderStatus(this.state.property.status, this.state.displayTag, true)}
              </div>
            </Col>
            <Col span={4}>
              <div className="status-tag">Edit</div>
            </Col>
          </Row>
        </div>
        {this.renderModalOnClick()}
      </div>
    );


  }

}

export default PropertyCard;
