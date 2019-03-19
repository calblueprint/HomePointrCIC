import React from "react";
import PropTypes from "prop-types";

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
      0: "Accepted",
      1: "Interviewing",
      2: "Applied",
      3: "Rejected",
      4: "No Applications"
    }
    return statuses[statusNum];
  }

  renderStatusTag = () => {
    if (this.state.displayTag) {
      return(
        <p>{this.tenantStatusHelper(this.state.tenant.status)}</p>
      )
    }
  }



  render() {
    return(
      <div className="card">
        {this.state.tenant.name}
        {this.state.tenant.email}
        {this.renderStatusTag()}
      </div>
    );


  }

}

export default TenantCard;
