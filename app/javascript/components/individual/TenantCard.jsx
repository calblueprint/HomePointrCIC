import React from "react";
import PropTypes from "prop-types";
import { Tag, Avatar } from "antd";
import Utils from "helpers/utils";
import '../../../assets/stylesheets/tenantcard.css';
import '../../../assets/stylesheets/application.css';

class TenantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: this.props.tenant,
      displayTag: this.props.displayTag
    }
  }

  tenantStatusHelper = (statusNum) => {
    const statuses = {
      0: ["Accepted", "green"],
      1: ["Interviewing", "blue"],
      2: ["Applied", "purple"],
      3: ["Declined", "red"],
      4: ["No Applications", "gold"]
    }
    return statuses[statusNum];
  }

  renderStatusTag = () => {
    if (this.state.displayTag) {
      const status = this.tenantStatusHelper(this.state.tenant.status)[0];
      const color = this.tenantStatusHelper(this.state.tenant.status)[1];
      return(
        <Tag color={color} className="tag">{status}</Tag>
      )
    }
  }

  renderAvatar = () => {
    return(
      <img className="img" height="142" width="144" src={this.state.tenant.url} />
    )
  }

  render() {
    return(
      <div className="tenant-card">

        <div className="avatar">{this.renderAvatar()}</div>
        <div className="content-container">
          <div className="header-container">
            <h2 className="title">{this.state.tenant.name}</h2>
            <div className="status-tag">{this.renderStatusTag()}</div>
          </div>
          <div className="details-container">
            <h3>Email</h3>
            <p>{this.state.tenant.email}</p>
          </div>
        </div>
      </div>
    );


  }

}

export default TenantCard;
