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
    return(
      <img className="img" height="144" width="144" src={this.state.tenant.url} />
    );
  }

  onDismiss = () => {
    this.setState({displayModal: false})
  }



  onTenantClick = () => {
    if (this.state.displayModal || this.state.disableDivClick) {
      return;
    } else if (this.state.renderModal) {
      this.setState({displayModal: true});
    } else {
      window.location='/tenants/' + this.state.tenant.id;
    }
  }

  renderModalOnClick = () => {
    if (this.state.renderModal && !this.state.renderEdit) {
      return(
        <TenantModal
          tenant={this.state.tenant}
          visible={this.state.displayModal}
          onOk={this.onDismiss}
          onCancel={this.onDismiss}
        />
      );
    }
  }

  handleEdit = () => {
    window.location = '/tenants/' + this.state.tenant.id.toString() + '/edit'
  }

  renderEdit = (event) => {
    if (this.state.viewpoint === "RA") {
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
                {Utils.renderStatus(this.state.tenant.status, this.state.displayTag, false)}
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
