import PropTypes from "prop-types";
import React from "react";

/**
* @prop buyer: buyer associated with profile
*/
class CreateTenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="create-tenant-page">
        <h1>Create Tenant</h1>
      </div>
    );
  }
}

export default CreateTenant;