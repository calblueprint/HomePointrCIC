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

  renderStatusTag = () => {

  }



  render() {
    return(
      <div className="card">
        {this.state.tenant.name}
        {this.state.tenant.}



      </div>
    );


  }

}

export default TenantCard;
